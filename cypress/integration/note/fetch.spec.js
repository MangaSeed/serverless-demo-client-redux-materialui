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
      .then(({ data }) => (createdNote = data));
  });

  it('can fetch a note along w/ new file attached', () => {
    cy.server();
    cy.route('GET', `${awsConfig.apiGateway.URL}/notes/*`).as('getNote');

    cy.visit(`/notes/${createdNote.noteId}`);

    cy.wait('@getNote')
      .its('status')
      .should('be', 200);

    cy.get('#content').should('have.length', 1);
    cy.get('#uploadFileButton').should('have.length', 1);
    cy.get('#fileNameLabel').should('have.length', 1);
    cy.get('#attachmentLink>a').should('have.length', 1);
    cy.get('#file').should('have.length', 1);
    cy.get('#removeNoteButton').should('have.length', 1);
    cy.get('#updateNoteButton').should('have.length', 1);

    cy.get('#content').should('have.value', createdNote.content);

    cy.get('#attachmentLink>a').contains(
      createdNote.attachment.replace(/^\w+-/, '')
    );

    cy.get('#attachmentLink>a')
      .should('have.attr', 'href')
      .and('contains', createdNote.attachment);
  });

  after(() => {
    cy.removeNote(createdNote.noteId, createdNote.attachment);
  });
});
