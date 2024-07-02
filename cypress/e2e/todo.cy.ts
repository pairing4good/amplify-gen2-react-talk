describe('todo app', () => {
  it('should have a header', () => {
    cy.authenticate('pairing4good');
    cy.visit('http://localhost:3000/')
    cy.contains('My todos')
  })
})