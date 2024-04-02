
it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
    cy.visit('./src/privacy.html')
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
})