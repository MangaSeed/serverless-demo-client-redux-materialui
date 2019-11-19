// THIS COULD BE AN ENV OR CONFIG FILE
const MAIL = 'vincent.nocum@gmail.com';
const PASS = '3ggy0Lk!@#';

const WRONG_MAIL = 'asfasfas@example.com';
const WRONG_PASS = 'asfajshf123!';

const COGNITO = 'https://cognito-identity.us-east-1.amazonaws.com/';

describe('Authentication - Sign in', () => {
  beforeEach(() => {
    cy.visit('/signin');
  });

  it('should have a signin page', () => {
    cy.get('#email').should('have.length', 1);
    cy.get('#password').should('have.length', 1);
    cy.get('#signin-button').should('have.length', 1);
  });

  it('should have a disabled button when no email given', () => {
    cy.get('#password').type(WRONG_PASS);
    cy.get('#signin-button').should('be.disabled');
  });

  it('should have a disabled button when no password given', () => {
    cy.get('#email').type(MAIL);
    cy.get('#signin-button').should('be.disabled');
  });

  it('should have a disabled button when no password and mail given', () => {
    cy.get('#password').type(WRONG_PASS);
    cy.get('#email').type(MAIL);

    cy.get('#password').clear();
    cy.get('#email').clear();

    cy.get('#signin-button').should('be.disabled');
  });

  it('should error and alert error w/ wrong credentials', () => {
    cy.get('#email').type(WRONG_MAIL);
    cy.get('#password').type(WRONG_PASS);
    cy.get('#signin-button').click();
    cy.on('window:alert', str => {
      expect(str).to.equal('User does not exist.');
    });
  });

  it('should be able to sign in w/ correct credentials', () => {
    cy.server();
    cy.route('POST', COGNITO).as('signIn');
    cy.get('#email').type(MAIL);
    cy.get('#password').type(PASS);
    cy.get('#signin-button').click();
    cy.wait('@signIn')
      .its('status')
      .should('be', 200);
  });
});
