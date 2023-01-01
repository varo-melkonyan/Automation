describe('empty spec', () => {
    const validLogin = "varazdat.gm@ovaktechnologies.com";    //valid login
    const validPassword = "Aa1234$#@!";                       //valid password

    it('Login with valid login and password', () => {
      
      // test commands
      function commands() {
        cy.get('.well-list__group').contains('Divide Draw 152M Soft').trigger('mouseover');
        cy.wait(1000);
        cy.get('.well-list__group').contains('GarrettHard').trigger('mouseover');
        cy.wait(1000);
        cy.get('.well-list__group').contains('GarrettSoftClone').trigger('mouseover');
        cy.wait(1000);
        cy.get('.well-list__group').contains('KWM121').trigger('mouseover');
        cy.wait(1000);
        cy.get('.well-list__group').contains('KWM145').trigger('mouseover');
        cy.wait(1000);
      }

      function loginPage() {
        cy.get("[name=username]").type(validLogin);
        cy.get("[name=password]").type(validPassword);
        cy.get("input[type=submit]").click();
        cy.wait(1000);
      }

      cy.viewport(1920, 1080);
      cy.visit('http://104.211.19.125:8282/');
      cy.wait(2000);
      // cy.screenshot('111', {capture: 'runner'})
      cy.url().then((url) => {
        cy.log(url);
        if ((url === 'https://automation.wellworxenergy.com/')) {
          loginPage();
          commands();
        }
        else {
          cy.get('.sis-account__button').click();
          cy.get('#logOutId').click();
          cy.wait(2000);
          cy.url().should("eq", "https://automation.wellworxenergy.com/");
          loginPage();
          commands();
        }
      })
    })
  })