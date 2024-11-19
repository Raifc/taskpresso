Cypress.Commands.add('createToDoItem', (title, description) => {
  cy.contains('Create To-Do Item').click();
  cy.get('#todo-title').type(title);
  cy.get('#todo-description').type(description);
  cy.get('form').contains('Create To-Do Item').click();
  cy.contains(title).should('be.visible');
});

Cypress.Commands.add('editToDoItem', (oldTitle, newTitle) => {
  cy.contains(oldTitle).closest('tr').within(() => {
    cy.get('#edit-button').click();
  });
  cy.get('#edit-todo-title').clear().type(newTitle);
  cy.get('#edit-todo-modal').contains('Update').click();
  cy.contains(newTitle).should('be.visible');
});

Cypress.Commands.add('completeToDoItem', (title) => {
  cy.contains(title)
    .closest('tr')
    .within(() => {
      cy.get('#complete-button').click();
    });
  cy.contains(title)
    .closest('tr')
    .should('contain', 'Complete');
});

Cypress.Commands.add('verifyCompletedStatus', (title) => {
  cy.get('select').select('Complete');
  cy.contains(title).should('be.visible');
  cy.get('#completed-items-table').should('contain', title);
});

Cypress.Commands.add('deleteToDoItem', (title) => {
  cy.contains(title)
    .closest('tr')
    .within(() => {
      cy.get('#delete-button').click();
    });
  cy.contains(title).should('not.exist');
});

Cypress.Commands.add('triggerValidationErrorOnCreate', () => {
  cy.contains('Create To-Do Item').click();
  cy.wait(500);
  cy.get('[data-cy="todo-title-input"]').clear();
  cy.get('form').contains('Create To-Do Item').click();
  cy.get('[data-cy="todo-title-input"]')
    .should('have.prop', 'validationMessage', 'Please fill out this field.')
    .and('have.attr', 'required');
});

Cypress.Commands.add('triggerValidationErrorOnEdit', (title) => {
  cy.contains(title).closest('tr').within(() => {
    cy.get('#edit-button').click();
  });
  cy.get('#edit-todo-modal').should('be.visible').within(() => {
    cy.get('[data-cy="edit-todo-title-input"]').clear();
    cy.get('#submit-edit').click();
    cy.get('[data-cy="edit-todo-title-input"]')
      .should('have.prop', 'validationMessage', 'Please fill out this field.')
      .and('have.attr', 'required');
  });
  cy.get('body').type('{esc}');
  cy.get('.ReactModal__Overlay').should('not.exist');
});
