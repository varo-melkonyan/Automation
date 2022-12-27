describe('Well status', () => {
    const validLogin = "varazdat.gm@ovaktechnologies.com";    //valid login
    const validPassword = "Aa1234$#@!";                       //valid password
    const wellName = "New Well 135";                         //Well name

    it('Check Well start / stop', () => {
        // test commands

        function commands() {
            cy.get('.well-list__group').contains(wellName).click();
            cy.wait(1000);
            cy.get('button[class=mat-button-toggle-button]').contains('Well Manager').click();
            cy.get('.sis-tabs__item').contains('Well Status').click();
            wellStatusCommands();
        }

        function wellStatusCommands() {
            cy.get('body').then(() => {
                cy.get('.footer-status__value').eq(2).as('wellState');
                cy.get("@wellState").then((e) => {
                    if (e[0].innerText != "Running" || e[0].innerText != "Operator Stopping" || e[0].innerText != "Stopping") {
                        cy.get('.gs-card-buttons__start').click();
                        cy.get("@wellState", {timeout: 60000}).should('have.text', "Running").then(() => {
                            cy.get('.gs-card-buttons__stop').click();
                        })
                    }
                })
                cy.get("@wellState", {timeout: 80000}).should('have.text', "Operator Stopped");
                cy.get('.sis-tabs__item').contains('I/O').click();
                cy.get('.sys-accordion__title').eq(2).click();
                cy.wait(1000);
                cy.get('.sys-accordion__grid-item--value').eq(12).should('have.text', "0");
                cy.get('.sys-accordion__title').eq(0).click();
                cy.get('.sys-accordion__grid-item--value').eq(0).then((e) => {
                    let oldValue;
                    oldValue = e[0].innerText;
                    cy.wait(5000);
                    if (oldValue >= e[0].innerText) {
                        cy.log(true);
                    }
                    else {
                        cy.pause();
                    }
                });
                cy.get('.sis-tabs__item').contains('Well Status').click();
                cy.wait(2000);
                checkRunning();
            });
        }

        function checkRunning() {
            cy.get('body').then(async () => {
                cy.get('.footer-status__value').eq(2).as('wellState');
                cy.get("@wellState").then((e) => {
                    if (e[0].innerText != "Operator Stopped" || e[0].innerText != "Stopped"
                        || e[0].innerText != "Operator Stopping" || e[0].innerText != "Stopping") {
                        cy.get("@wellState", {timeout: 80000}).should('have.text', "Operator Stopped").then(() => {
                            cy.get('.gs-card-buttons__start').click();
                        })
                    }
                })
                cy.get("@wellState", {timeout: 60000}).should('have.text', "Running");
                cy.get('.sis-tabs__item').contains('I/O').click();
                cy.get('.sys-accordion__title').eq(2).click();
                cy.wait(1000);
                cy.get('.sys-accordion__grid-item--value').eq(12).should('have.text', "1");
                cy.get('.sys-accordion__title').eq(0).click();
                cy.get('.sys-accordion__grid-item--value').eq(0).then((e) => {
                    let oldValue;
                    oldValue = e[0].innerText;
                    cy.wait(5000);
                    cy.get('.sys-accordion__grid-item--value').eq(0).should('not.have.text', oldValue);
                });
            });
        }


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
