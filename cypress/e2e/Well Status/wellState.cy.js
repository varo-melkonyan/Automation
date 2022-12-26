import { WsService } from 'assets/ws.service.ts';
describe('Well status', () => {
    const validLogin = "varazdat.gm@ovaktechnologies.com";    //valid login
    const validPassword = "Aa1234$#@!";                       //valid password
    const wellName = "New Well 135";                         //Well name
    const svc: WsService;

    it('Check Well start / stop', () => {
        // test commands

        function commands() {
            cy.get('.well-list__group').contains(wellName).click();
            cy.wait(1000);
            cy.get('button[class=mat-button-toggle-button]').contains('Well Manager').click();
            cy.get('.sis-tabs__item').contains('Well Status').click();
            wellStatusCommands();
        }

        async function wellStatusCommands() {
            cy.get('body').then(async () => {
                cy.get('.footer-status__value').eq(2).as('wellState');
                // cy.wait("@wellState").then((e) => {
                //     if (e.innerHTML === "Running") {
                //         console.log(true)
                //     }
                // })
                cy
                    .window()
                    .then(({ app }) => {
                        console.log(app);
                    });
            });
        }

        //check state


        //login
        function loginPage() {
            cy.get("[name=username]").type(validLogin);
            cy.get("[name=password]").type(validPassword);
            cy.get("input[type=submit]").click();
            cy.wait(1000);
        }

        cy.viewport(1920, 1080);
        cy.clearCookies();
        cy.visit('http://104.211.19.125:8282/');
        cy.clearCookies();
        cy.wait(2000);
        cy.url().then((url) => {
            cy.log(url);
            if ((url === 'https://automation.wellworxenergy.com/')) {
                loginPage();
                cy.wait(3000);
                // cy.get('body').type('{shift}{ctrl}');
                // cy.get('.devMode').contains('Open Sesame').click();
                commands();
            } else {
                cy.get('.sis-account__button').click();
                cy.get('#logOutId').click();
                cy.wait(2000);
                cy.url().should("eq", "https://automation.wellworxenergy.com/");
                loginPage();
                cy.wait(3000);
                // cy.get('body').type('{shift}{ctrl}');
                // cy.get('.devMode').contains('Open Sesame').click();
                commands();
            }
        })
    })
})
