import * as Http from '../../utils/http-mock';

import faker from 'faker';

const populateFields = (): void => {
  cy.getByTestId('email').focus().type(faker.internet.email());
  cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5));
};

const path = '/auth/v1/user/tokens';
const mockSuccess = (): void =>
  Http.mockSuccess(path, 'POST', 'fixture:user/token.json');

const simulateValidSubmit = (): void => {
  populateFields();
  cy.getByTestId('submit').click();
};

describe('SignIn', () => {
  beforeEach(() => {
    cy.visit('');
  });

  it('Should load with correct helper values', () => {
    cy.getByTestId('submit').click();

    cy.getByTestId('email-helper').should('exist');
  });

  it('Should present password entered', () => {
    cy.getByTestId('email').focus().type(faker.internet.email());

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5));

    cy.getByTestId('password-icon-password').trigger('mousedown');
  });

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email());

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5));

    cy.getByTestId('password-icon-password').trigger('mousedown');

    cy.getByTestId('submit').click();

    cy.getByTestId('email-helper').should('not.exist');
  });

  it('Should store account on localStorage if valid credentials are provided', () => {
    mockSuccess();

    simulateValidSubmit();
  });
});
