Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Éverton', {delay: 0})
    cy.get('#lastName').type('Lopes', {delay: 0})
    cy.get('#email').type('email@gmail.com', {delay: 0})
    cy.get('#open-text-area').type('teeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeexto', {delay: 0})
    cy.get('.button').click()
    cy.get('.success').should('be.visible')
})