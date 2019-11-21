import { v4 } from 'uuid';

// THIS COULD BE AN ENV OR CONFIG FILE
const MAIL = `${v4()}@example.com`;
const PASS = 'Passw0rd!';
const WRONG_PASS = 'password';
const USED_MAIL = 'admin@example.com';

describe('Authentication - Sign up', () => {
  beforeEach(() => {
    cy.visit('/signup');
  });

  it('should have a sign up page', () => {
    cy.get('#email').should('have.length', 1);
    cy.get('#password').should('have.length', 1);
    cy.get('#confirm-password').should('have.length', 1);
    cy.get('#signup-button').should('have.length', 1);
  });

  it('should disable sign up if fields are empty', () => {
    cy.get('#email').type(MAIL);
    cy.get('#password').type(PASS);
    cy.get('#confirm-password').type(PASS);
    cy.get('input').clear();
    cy.get('#signup-button').should('be.disabled');
  });

  it('should disable sign up if email is empty', () => {
    cy.get('#password').type(PASS);
    cy.get('#confirm-password').type(PASS);
    cy.get('#signup-button').should('be.disabled');
  });

  it('should disable sign up if password is empty', () => {
    cy.get('#email').type(MAIL);
    cy.get('#signup-button').should('be.disabled');
  });

  it('should disable sign up if password confirmation is empty or wrong', () => {
    cy.get('#email').type(MAIL);
    cy.get('#password').type(PASS);
    cy.get('#signup-button').should('be.disabled');

    cy.get('#confirm-password').type(WRONG_PASS);
    cy.get('#signup-button').should('be.disabled');
  });

  it('should error when using a used email', () => {
    cy.get('#email').type(USED_MAIL);
    cy.get('#password').type(PASS);
    cy.get('#confirm-password').type(PASS);
    cy.get('#signup-button').click();
    cy.on('window:alert', str => {
      expect(str).to.equal('An account with the given email already exists.');
    });
  });

  it('should be able to sign up', () => {
    cy.get('#email').type(MAIL);
    cy.get('#password').type(PASS);
    cy.get('#confirm-password').type(PASS);
    cy.get('#signup-button').click();
    cy.get('#confirmation-code').should('have.length', 1);
  });
});
