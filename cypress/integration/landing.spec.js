describe('Testing app auth signin', () => {
  beforeEach(() => {
    cy.visit('localhost:3000');
  });

  it('should show "A simple note taking app"', () => {
    cy.findByText('A simple note taking app').should('have.length', 1);
  });
});
