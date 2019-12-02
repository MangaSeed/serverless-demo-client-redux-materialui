import { v4 } from 'uuid';
import awsConfig from '../../support/config/aws.config';

const NOTE_CONTENT = `Note - ${v4()}`;

describe('Note - Create', () => {
  const createdNotes = [];

  beforeEach(() => {
    cy.visit('/');
    const mail = Cypress.env('mail');
    const pass = Cypress.env('pass');
    cy.signIn(mail, pass);
    cy.visit('/notes/new');
  });

  it('should have a note creation page', () => {
    cy.get('#content').should('have.length', 1);
    cy.get('#file').should('have.length', 1);
    cy.get('#uploadFileButton').should('have.length', 1);
    cy.get('#createButton').should('have.length', 1);
  });

  it("should disable create button if there's no note given", () => {
    cy.get('#content')
      .type(NOTE_CONTENT)
      .clear();

    cy.get('#createButton').should('be.disabled');
  });

  it('should throw an alert error when upload is bigger than 5mb', () => {
    const FILE_NAME = 'sample10mb.jpg';

    cy.get('#content').type(NOTE_CONTENT);
    cy.fixture(`images/${FILE_NAME}`).then(fileContent => {
      cy.get('#file').upload({
        fileContent,
        fileName: FILE_NAME,
        mimeType: 'image/jpeg',
      });
    });

    cy.get('#createButton').click();
    cy.on('window:alert', str => {
      expect(str).to.equal('Please pick a file smaller than 5 MB.');
    });
  });

  it('should be able to create a note w/o an attachment', () => {
    cy.server();
    cy.route('POST', `${awsConfig.apiGateway.URL}/notes`).as('createNote');
    cy.route('GET', `${awsConfig.apiGateway.URL}/notes`).as('getNotes');

    cy.get('#content').type(NOTE_CONTENT);
    cy.get('#createButton').click();

    let createdNote = null;

    cy.wait('@createNote').then(xhr => {
      const { data } = xhr.responseBody;
      const status = xhr.status;

      expect(data.content).to.be.equal(NOTE_CONTENT);
      expect(status).to.be.equal(200);

      createdNote = data;
    });

    cy.wait('@getNotes').then(xhr => {
      const { data } = xhr.responseBody;
      const note = data.filter(({ noteId }) => noteId === createdNote.noteId);

      createdNotes.push(createdNote);
      expect(note).to.have.length(1);
    });
  });

  it('should be able to create a note w/ an attachment', () => {
    const FILE_NAME = 'sample.jpg';

    cy.server();
    cy.route('POST', `${awsConfig.apiGateway.URL}/notes`).as('createNote');
    cy.route('GET', `${awsConfig.apiGateway.URL}/notes`).as('getNotes');

    cy.get('#content').type(NOTE_CONTENT);
    cy.fixture(`images/${FILE_NAME}`).then(fileContent => {
      cy.get('#file').upload({
        fileContent,
        fileName: FILE_NAME,
        mimeType: 'image/jpeg',
      });
    });

    cy.get('#createButton').click();
    cy.wait('@createNote').then(xhr => {
      const { data } = xhr.responseBody;
      const status = xhr.status;

      createdNotes.push(data);
      expect(data.attachment).includes(FILE_NAME);
      expect(data.content).to.be.equal(NOTE_CONTENT);
      expect(status).to.be.equal(200);
    });
  });

  after(() => {
    const removedNotes = createdNotes.map(note =>
      cy.removeNote(note.noteId, note.attachment)
    );

    Promise.all(removedNotes);
  });
});
