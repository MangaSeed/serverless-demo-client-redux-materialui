import { v4 } from 'uuid';
import awsConfig from '../../support/config/aws.config';

const NOTE_CONTENT = `Note - ${v4()}`;
const FILE_NAME = 'sample.jpg';

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
      .then(res => (createdNote = res));
  });

  it('can fetch notes and display notes', () => {
    cy.server();
    cy.route('GET', `${awsConfig.apiGateway.URL}/notes`).as('getNotes');

    cy.visit('/');
    cy.wait('@getNotes')
      .its('status')
      .should('be', 200);

    cy.get('#notes>a').should('have.length.greaterThan', 1);
    cy.get('#notes>a').contains(createdNote.content);
  });

  after(() => {
    cy.removeNote(createdNote.noteId, createdNote.attachment);
  });
});
