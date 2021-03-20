describe('My First Test', () => {
  it('Does not do much!', () => {
    // cy.visit('http://localhost:3000');
    // cy.visit("/")
    cy.visit('https://example.cypress.io');

    cy.contains('type').click();

    cy.url().should('include', '/commands/actions');

    cy.get('.action-email')
      .type('fake@email.com')
      .should('have.value', 'fake@email.com');
  });
});
