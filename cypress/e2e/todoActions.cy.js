describe('To-Do App', () => {
  const timestamp = new Date().getTime();
  const title = `Test To-Do Item ${timestamp}`;
  const description = 'This is a test description';
  const updatedTitle = `${title} Updated`;

  it('should create, edit, complete, filter, and delete a to-do item', () => {
    cy.visit('http://localhost:3003');
    cy.createToDoItem(title, description);
    cy.editToDoItem(title, updatedTitle);
    cy.completeToDoItem(updatedTitle);
    cy.verifyCompletedStatus(updatedTitle);
    cy.deleteToDoItem(updatedTitle);
  });
});
