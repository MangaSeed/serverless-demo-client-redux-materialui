// THIS COULD BE AN ENV OR CONFIG FILE
const MAIL = 'vincent.nocum@gmail.com';
const PASS = '3ggy0Lk!@#';

describe('Authentication - Sign out', () => {
  before(() => {
    cy.signIn(MAIL, PASS);
    cy.visit('/');
  });

  it('should be able to sign out', () => {
    cy.get('#sign-out-button').click();
    cy.url().should('have', 'signin');
    cy.checkAuth().should('eq', 'No current user');
  });
});
