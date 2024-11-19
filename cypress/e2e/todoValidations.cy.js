describe('To-Do Validation', () => {
  const timestamp = new Date().getTime();
  const title = `Test To-Do Item ${timestamp}`;
  const description = 'This is a test description';

  it('should show validation error when required fields are missing on create', () => {
    cy.visit('http://localhost:3003');
    cy.triggerValidationErrorOnCreate();
  });

  it('should show validation error when required fields are missing on edit', () => {
    cy.visit('http://localhost:3003');
    cy.createToDoItem(title, description);
    cy.triggerValidationErrorOnEdit(title);
    cy.deleteToDoItem(title);
  });
});
