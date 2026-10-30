describe('Expense tracker', () => {
  it('adds expenses and filters by category', () => {
    cy.visit('/');

    cy.get('[data-cy="title"]').type('Lunch');
    cy.get('[data-cy="amount"]').type('250');
    cy.get('[data-cy="category"]').select('Food');
    cy.get('[data-cy="add-expense"]').click();

    cy.get('[data-cy="title"]').type('Cab');
    cy.get('[data-cy="amount"]').type('400');
    cy.get('[data-cy="category"]').select('Travel');
    cy.get('[data-cy="add-expense"]').click();

    cy.get('[data-cy="total"]').should('contain', '$650.00');
    cy.get('[data-cy="count"]').should('contain', '2');

    cy.get('[data-cy="filter"]').select('Food');
    cy.get('[data-cy="expense-item"]').should('have.length', 1);
    cy.get('[data-cy="expense-item"]').should('contain', 'Lunch');
    cy.get('[data-cy="count"]').should('contain', '1');
    cy.get('[data-cy="total"]').should('contain', '$250.00');
  });

  it('rejects an empty title and a negative amount', () => {
    cy.visit('/');

    cy.get('[data-cy="amount"]').type('25');
    cy.get('[data-cy="add-expense"]').click();
    cy.get('[role="alert"]').should('contain', 'Title is required.');
    cy.get('[data-cy="expense-item"]').should('not.exist');

    cy.get('[data-cy="title"]').type('Invalid expense');
    cy.get('[data-cy="amount"]').clear().type('-5');
    cy.get('[data-cy="add-expense"]').click();
    cy.get('[role="alert"]').should('contain', 'Amount must be greater than 0.');
    cy.get('[data-cy="expense-item"]').should('not.exist');
    cy.get('[data-cy="count"]').should('contain', '0');
    cy.get('[data-cy="total"]').should('contain', '$0.00');
  });

  it('deletes an expense and updates the total and count', () => {
    cy.visit('/');

    cy.get('[data-cy="title"]').type('Lunch');
    cy.get('[data-cy="amount"]').type('250');
    cy.get('[data-cy="add-expense"]').click();

    cy.get('[data-cy="expense-item"]')
      .should('have.length', 1)
      .within(() => {
        cy.get('[data-cy="delete-expense"]').click();
      });

    cy.get('[data-cy="expense-item"]').should('not.exist');
    cy.get('[data-cy="count"]').should('contain', '0');
    cy.get('[data-cy="total"]').should('contain', '$0.00');
  });
});
