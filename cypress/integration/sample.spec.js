describe('Landing Page', () => {
  beforeEach(() => {
    cy.visit('localhost:3000');
  });

  it('should show "A simple note taking app"', () => {
    cy.findByText('A simple note taking app').should('have.length', 1);
  });

  describe('When clicking "LOG IN"', () => {
    it('we should see the login form', () => {
      cy.findByText('LOG IN').click();
      cy.findByLabelText('Email').should('have.length', 1);
      cy.findByLabelText('Password').should('have.length', 1);
    });
  });
});
