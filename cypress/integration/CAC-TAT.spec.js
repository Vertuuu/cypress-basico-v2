/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function () {
        cy.get('#firstName').type('Éverton', {delay: 0})
        cy.get('#lastName').type('Lopes', {delay: 0})
        cy.get('#email').type('email@gmail.com', {delay: 0})
        cy.get('#open-text-area').type('teeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeexto', {delay: 0})
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })
    it('dá algum erro', function () {
        cy.get('#firstName').type('Éverton')
        cy.get('#lastName').type('Lopes')
        cy.get('#email').type('email')
        cy.get('#open-text-area').type('teeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeexto', {delay: 0})
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('campo telefone vazio quando valor =/= numérico', function () {
        cy.get('#phone').type('abcdsdaa').should('have.value', '')

    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.get('#phone-checkbox').check()
        cy.get('#phone').type('40028922w')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('#firstName').type('Éverton')
            .should('have.value', 'Éverton')
            .clear()
                .should('have.value', '')
        cy.get('#lastName').type('Lopes')
            .should('have.value', 'Lopes')
            .clear()
                .should('have.value', '')
        cy.get('#email').type('email@gmail.com')
            .should('have.value', 'email@gmail.com')
            .clear()
                .should('have.value', '')
        cy.get('#open-text-area').type('teeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeexto', {delay: 0})
            .should('have.value', 'teeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeexto')
            .clear()
                .should('have.value', '')
        cy.contains('button', 'Enviar').click()
    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()
    })
    it('seleciona um produto (YouTube) por seu texto', function() {
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })
    it('seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })
    it('seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product').select(1).should('have.value', 'blog')
    })
    it('marca o tipo de atendimento "Feedback"', function() {
        cy.get('input[value="feedback"]').check()
    })
    it('marca o tipo de atendimento', function() {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })
    it('marca o tipo de atendimento', function() {
        cy.get('input[type="checkbox"]')
            .should('have.length', 2)
            .check()
            .should('be.checked')
        cy.get('input[type="checkbox"]')
            .last().uncheck()
            .should('be.not.checked')
    })
    it('seleciona um arquivo da pasta fixtures', function() {
        cy.get('input[type="file"]').selectFile('./cypress/fixtures/example.json')
        .should(function(input) {
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })
    it('seleciona um arquivo simulando um drag-and-drop', function() {
        cy.get('input[type="file"]').selectFile('./cypress/fixtures/example.json', {action:'drag-drop'})
        .should(function(input) {
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })
    it('seleciona um arquivo da pasta fixtures', function() {
        cy.fixture('example.json').as('exemplo')
        cy.get('input[type="file"]').selectFile('@exemplo')
        .should(function(input) {
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
        cy.get('a[href="privacy.html"').should('have.attr', 'target', '_blank')
    })
    it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
        cy.get('div[class="privacy"')
            .should('be.visible')
    })
})