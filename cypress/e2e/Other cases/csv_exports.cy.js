describe('empty spec', () => {
    const validLogin = "varazdat.gm@ovaktechnologies.com";    //valid login
    const validPassword = "Aa1234$#@!";                       //valid password

    it('"Well Status" tab CSV exports', () => {

        // test commands
        function commands() {
            cy.get('.well-list__group').contains('GarrettHard').click();
            cy.wait(4000);
            cy.get('[ng-reflect-name="Last Successful Fluid Level Sh"]').get('.highcharts-exporting-group').first().click();
            cy.contains('Download CSV').click();
            cy.get('.chart-item').first().trigger('mousedown', 'center');
            logoutPage();
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