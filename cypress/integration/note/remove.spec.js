import { v4 } from 'uuid';
import awsConfig from '../../support/config/aws.config';

const NOTE_CONTENT = `Note - ${v4()}`;

describe('Note - Delete', () => {
  let createdNote = null;

  before(() => {
    cy.visit('/');

    const FILE_NAME = 'sample.jpg';
    const mail = Cypress.env('mail');
    const pass = Cypress.env('pass');

    cy.signIn(mail, pass);
    cy.fixture(`images/${FILE_NAME}`)
      .then(sampleFile =>
        Cypress.Blob.base64StringToBlob(sampleFile, 'image/jpeg')
      )
      .then(blob => new File([blob], FILE_NAME, { type: blob.type }))
      .then(file => cy.createNote(NOTE_CONTENT, file))
      .then(({ data }) => {
        createdNote = data;
        cy.visit(`/notes/${createdNote.noteId}`);
      });
  });

  it('should ask for confirmation to delete file', () => {
    cy.get('#removeNoteButton').click();
    cy.on('window:confirm', msg => {
      expect(msg).to.equal('Are you sure you want to delete this note?');
      return false;
    });
  });

  it('can delete a note along w/ file attached', () => {
    cy.server();
    cy.route('GET', `${awsConfig.apiGateway.URL}/notes`).as('getNotes');
    cy.route('DELETE', `${awsConfig.apiGateway.URL}/notes/*`).as('deleteNote');

    cy.get('#removeNoteButton').click();

    cy.wait('@deleteNote')
      .its('status')
      .should('be', 200);

    cy.wait('@getNotes').then(xhr => {
      const { data } = xhr.responseBody;
      const note = data.filter(note => note.noteId === createdNote.noteId);
      expect(note).to.be.empty;
    });

    cy.contains(createdNote.content).should('not.exist');
  });
});
