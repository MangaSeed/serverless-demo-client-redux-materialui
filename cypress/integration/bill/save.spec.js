import { apiGateway } from '../../../src/config/aws.config';

const MAIL = 'vincent.nocum@gmail.com';
const PASS = '3ggy0Lk!@#';
const CNUM = '4242424242424242';
const EXPD = '456';
const CVCN = '1234';
const PSTL = '12345';
const NAME = 'John Doe';
const STRG = 10;
const FRAME = '.StripeElement iframe';

describe('Bill - Save', () => {
  before(() => {
    cy.visit('/');
  });

  beforeEach(() => {
    cy.signIn(MAIL, PASS);
    cy.visit('/settings');
  });

  it('should disable purchase button if fields are blank', () => {
    cy.get('#storage').type(STRG);
    cy.get('#name').type(NAME);
    cy.getWithinFrame(FRAME, 'input[name="cardnumber"]').type(CNUM);
    cy.getWithinFrame(FRAME, 'input[name="exp-date"]').type(EXPD);
    cy.getWithinFrame(FRAME, 'input[name="cvc"]').type(CVCN);
    cy.getWithinFrame(FRAME, 'input[name="postal"]').type(PSTL);

    cy.get('#storage').clear();
    cy.get('#name').clear();
    cy.getWithinFrame(FRAME, 'input[name="cardnumber"]').clear();
    cy.getWithinFrame(FRAME, 'input[name="exp-date"]').clear();
    cy.getWithinFrame(FRAME, 'input[name="cvc"]').clear();

    cy.get('#saveBillButton').should('be.disabled');
  });

  it('should disable purchase button if storage field is blank', () => {
    cy.get('#name').type(NAME);
    cy.getWithinFrame(FRAME, 'input[name="cardnumber"]').type(CNUM);
    cy.getWithinFrame(FRAME, 'input[name="exp-date"]').type(EXPD);
    cy.getWithinFrame(FRAME, 'input[name="cvc"]').type(CVCN);
    cy.getWithinFrame(FRAME, 'input[name="postal"]').type(PSTL);

    cy.get('#saveBillButton').should('be.disabled');
  });

  it('should disable purchase button if name field is blank', () => {
    cy.get('#storage').type(STRG);
    cy.getWithinFrame(FRAME, 'input[name="cardnumber"]').type(CNUM);
    cy.getWithinFrame(FRAME, 'input[name="exp-date"]').type(EXPD);
    cy.getWithinFrame(FRAME, 'input[name="cvc"]').type(CVCN);
    cy.getWithinFrame(FRAME, 'input[name="postal"]').type(PSTL);

    cy.get('#saveBillButton').should('be.disabled');
  });

  it('should disable purchase button if card details are incomplete', () => {
    cy.get('#storage').type(STRG);
    cy.get('#name').type(NAME);
    cy.get('#saveBillButton').should('be.disabled');

    cy.getWithinFrame(FRAME, 'input[name="cardnumber"]').type(CNUM);
    cy.get('#saveBillButton').should('be.disabled');

    cy.get('#saveBillButton').should('be.disabled');
    cy.getWithinFrame(FRAME, 'input[name="exp-date"]').type(EXPD);

    cy.get('#saveBillButton').should('be.disabled');
    cy.getWithinFrame(FRAME, 'input[name="cvc"]').type(CVCN);

    cy.get('#saveBillButton').should('be.disabled');
    cy.getWithinFrame(FRAME, 'input[name="postal"]').type(PSTL);

    cy.get('#saveBillButton').should('not.be.disabled');
  });

  it('should be able to save the bill', () => {
    cy.server();
    cy.route('POST', `${apiGateway.URL}/billing`).as('postBilling');

    cy.get('#storage').type(STRG);
    cy.get('#name').type(NAME);
    cy.getWithinFrame(FRAME, 'input[name="cardnumber"]').type(CNUM);
    cy.getWithinFrame(FRAME, 'input[name="exp-date"]').type(EXPD);
    cy.getWithinFrame(FRAME, 'input[name="cvc"]').type(CVCN);
    cy.getWithinFrame(FRAME, 'input[name="postal"]').type(PSTL);

    cy.get('#saveBillButton').click();
    cy.wait('@postBilling')
      .its('status')
      .should('be', 200);
  });
});
