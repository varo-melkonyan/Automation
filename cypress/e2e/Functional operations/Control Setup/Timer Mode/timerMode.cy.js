describe('Well status', () => {
    const validLogin = "varazdat.gm@ovaktechnologies.com";    //valid login
    const validPassword = "Aa1234$#@!";                       //valid password
    const wellName = "KWM+ 135";                         //Well name

    const onTime = "01";
    const offTime = "02";

    it('Check the work of Fillage Mode', () => {
        // test commands
        function commands() {
            cy.get('.well-list__group').contains(wellName).click();
            cy.wait(1000);
            cy.get('button[class=mat-button-toggle-button]').contains('Well Manager').click();
            cy.get('.sis-tabs__item').contains('Control Setup').click();
            controlSetupCommands();
        }

        async function controlSetupCommands() {
            await cy.get('.mat-select').eq(0).click();
            await cy.get('.mat-option-text').contains("Timer, On/Off").click();
            await cy.get('[formgroupname="vfdUse"] .mat-slide-toggle-input')
                .invoke('val', 'aria-checked')
                .then(async (e) => {
                    await cy.get('.mat-select').eq(2).click({force: true}).type(onTime).type('{enter}');
                    await cy.get('.mat-select').eq(4).click({force: true}).type(offTime).type('{enter}');
                    await cy.get('#saveControl').click();
                    await cy.wait(3000);
                    await cy.reload();
                    await cy.wait(4000);
                    await checkStatus();
                })
        }

        async function checkStatus() {
            await cy.get('body').then(() => {
                cy.get('.footer-status__value').eq(2).as('wellState');
                cy.get('@wellState').then((e) => {
                    if (e[0].innerText != "Stopped") {
                        cy.get("@wellState", {timeout: onTime * 60000 + 20000}).should('have.text', "Stopping");
                    }
                })
                cy.get("@wellState", {timeout: onTime * 60000 + 100000}).should('have.text', "Stopped");
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
                    } else {
                        cy.pause();
                    }
                });
                cy.get('.sis-tabs__item').contains('Control Setup').click();
                cy.wait(2000);
                cy.get('@wellState').then((e) => {
                    if (e[0].innerText === "Stopped") {
                        cy.get("@wellState", {timeout: offTime * 60000 + 20000}).should('have.text', "Starting");
                    }
                })
                cy.get("@wellState", {timeout: offTime * 60000 + 100000}).should('have.text', "Running");
                cy.get('.sis-tabs__item').contains('I/O').click();
                cy.get('.sys-accordion__title').eq(2).click();
                cy.wait(1000);
                cy.get('.sys-accordion__grid-item--value').eq(12).should('have.text', "1");
                cy.get('.sys-accordion__title').eq(0).click();
                let oldValue;
                cy.get('.sys-accordion__grid-item--value').eq(0).then((e) => {
                    oldValue = e[0].innerText;
                });
                cy.wait(5000);
                cy.get('.sys-accordion__grid-item--value').eq(0).then((e) => {
                    if (oldValue != e[0].innerText) {
                        cy.log(true);
                    } else {
                        cy.pause();
                    }
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
