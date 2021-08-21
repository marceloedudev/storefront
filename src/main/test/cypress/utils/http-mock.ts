export const mockSuccess = (url: string, method: string, response: any) => {
  cy.server();
  cy.route({
    method,
    url,
    status: 200,
    response,
    delay: 500,
  }).as('request');
};
