describe('empty spec', () => {
    const validLogin = "varazdat.gm@ovaktechnologies.com";    //valid login
    const validPassword = "Aa1234$#@!";                       //valid password

    it('"Check Control modes', () => {

        // test commands
        
        function commands() {
            // cy.pause();
            cy.get('.well-list__group').contains('GarrettHard').click();
            cy.wait(4000);
            cy.injectAxe();
            cy.checkA11y()
            // logoutPage();
        }

        function loginPage() {
            cy.get("[name=username]").type(validLogin);
            cy.get("[name=password]").type(validPassword);
            cy.get("input[type=submit]").click();
            cy.wait(1000);
        }

        function logoutPage() {
            cy.get('.sis-account__button').click();
            cy.get('#logOutId').click();
            cy.wait(2000);
            cy.url().should("eq", "https://automation.wellworxenergy.com/");
        }

        cy.viewport(1920, 1080);
        cy.clearCookies();
        cy.visit('http://104.211.19.125:8282/');
        cy.wait(2000);
        cy.url().then((url) => {
        cy.log(url);
        if ((url === 'https://automation.wellworxenergy.com/')) {
            loginPage();
            commands();
        }
        else {
            logoutPage();
            loginPage();
            commands();
        }
      })
    })
})