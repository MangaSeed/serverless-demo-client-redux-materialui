import { v4 } from 'uuid';
import awsConfig from '../../support/config/aws.config';

const NOTE_CONTENT = `Note - ${v4()}`;
const NOTE_CONTENT_UPDATED = `(Updated) ${NOTE_CONTENT}`;

const FILE_NAME = 'sample.jpg';
const FILE_NAME_LARGE = 'sample10mb.jpg';
const FILE_NAME_UPDATED = `updated_${FILE_NAME}`;

describe('Note - Update', () => {
  let createdNote = null;

  before(() => {
    cy.visit('/');

    const mail = Cypress.env('mail');
    const pass = Cypress.env('pass');

    cy.signIn(mail, pass);
    cy.fixture(`images/${FILE_NAME}`)
      .then(sampleFile =>
        Cypress.Blob.base64StringToBlob(sampleFile, 'image/jpeg')
      )
      .then(blob => new File([blob], FILE_NAME, { type: blob.type }))
      .then(file => cy.createNote(NOTE_CONTENT, file))
      .then(res => {
        createdNote = res;
        cy.visit(`/notes/${createdNote.noteId}`);
      });
  });

  it('should throw an alert error when upload is bigger than 5mb', () => {
    cy.fixture(`images/${FILE_NAME_LARGE}`).then(fileContent => {
      cy.get('#file').upload({
        fileContent,
        fileName: FILE_NAME_LARGE,
        mimeType: 'image/jpeg'
      });
    });

    cy.get('#updateNoteButton').click();
    cy.on('window:alert', str => {
      expect(str).to.equal('Please pick a file smaller than 5 MB.');
    });
  });

  it('can update a note along w/ new file attached', () => {
    cy.server();
    cy.route('GET', `${awsConfig.apiGateway.URL}/notes`).as('getNotes');
    cy.route('PUT', `${awsConfig.apiGateway.URL}/notes/*`).as('updateNote');

    cy.get('#content')
      .clear()
      .type(NOTE_CONTENT_UPDATED);

    cy.fixture(`images/${FILE_NAME}`).then(fileContent => {
      cy.get('#file').upload({
        fileContent,
        fileName: FILE_NAME_UPDATED,
        mimeType: 'image/jpeg'
      });
    });

    cy.get('#updateNoteButton').click();
    cy.wait('@updateNote')
      .its('status')
      .should('be', 200);

    cy.wait('@getNotes').then(xhr => {
      const response = xhr.responseBody;
      const note = response.filter(note => note.noteId === createdNote.noteId);

      createdNote = note[0];

      expect(note).to.have.length(1);
      expect(note[0].content).to.be.equal(NOTE_CONTENT_UPDATED);
      expect(note[0].attachment).contains(FILE_NAME_UPDATED);
    });

    cy.contains(NOTE_CONTENT_UPDATED);
  });

  after(() => {
    cy.removeNote(createdNote.noteId, createdNote.attachment);
  });
});
