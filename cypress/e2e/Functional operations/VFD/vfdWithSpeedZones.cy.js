describe('VFD', () => {
    const validLogin = "varazdat.gm@ovaktechnologies.com";    //valid login
    const validPassword = "Aa1234$#@!";                       //valid password
    const wellName = "KWM+ 135";                         //Well name

    const fillageSetPoint = 90;
    const allowedStroke = 2;
    const startUpStroke = 2;
    const secondaryFillageSetPoint = 80;

    it('Check the work of VFD without Speed Zones', () => {
        // test commands
        function commands() {
            cy.get('.well-list__group').contains(wellName).click();
            cy.wait(1000);
            cy.get('button[class=mat-button-toggle-button]').contains('Well Manager').click();
            onOffModbusUnit(0);
            controlSetupCommands();
        }

        async function controlSetupCommands() {
            await cy.get('.mat-select').eq(0).click();
            await cy.get('.mat-option-text').contains("Fillage").click();
            await cy.get('[formgroupname="vfdUse"] .mat-slide-toggle-input')
                .invoke('val', 'aria-checked')
                .then((e) => {
                    if (e[0].checked) {
                        cy.get('.mat-slide-toggle').eq(1).click();
                        cy.get('.mat-input-element').eq(0).clear().type(fillageSetPoint);
                        cy.get('.mat-input-element').eq(1).clear().type(allowedStroke);
                        cy.get('.mat-input-element').eq(2).clear().type(startUpStroke);
                        cy.get('.mat-select').eq(2).click().type('02').type('{enter}');
                        cy.get('#saveControl').click();
                        cy.wait(3000);
                        cy.reload();
                        cy.wait(4000);
                        onOffModbusUnit(1);
                        checkStatus();
                    } else {
                        cy.get('.mat-input-element').eq(0).clear().type(fillageSetPoint);
                        cy.get('.mat-input-element').eq(1).clear().type(allowedStroke);
                        cy.get('.mat-input-element').eq(2).clear().type(startUpStroke);
                        cy.get('.mat-select').eq(2).click().type('02').type('{enter}');
                        cy.get('#saveControl').click();
                        cy.wait(3000);
                        cy.reload();
                        cy.wait(4000);
                        onOffModbusUnit(1);
                        checkStatus();
                    }
                })
            checkSecondary();
        }

        function checkStatus() {
            cy.get('body').then(() => {
                cy.get('.footer-status__value').eq(2).as('wellState');
                cy.get('.footer-status__value').eq(2).then((e) => {
                    if (e[0].innerText != "Stopped") {
                        cy.get("@wellState", {timeout: 80000}).should('have.text', "Stopping");
                    }
                })
                cy.get("@wellState", {timeout: 180000}).should('have.text', "Stopped");
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
                cy.get('.header-buttons__start').click();
                cy.get('.mat-select').eq(0).click();
                cy.get('.mat-option-text').contains("Host").click();
                cy.get('#saveControl').click();
                cy.wait(3000);
            });
        }

        function checkSecondary() {
            onOffModbusUnit(0);
            cy.get('.mat-select').eq(0).click();
            cy.get('.mat-option-text').contains("Fillage").click();
            cy.wait(3000);
            cy.get('[formgroupname="vfdUse"] .mat-slide-toggle-input')
                .invoke('val', 'aria-checked')
                .then((e) => {
                    if (!e[0].checked) {
                        cy.get('.mat-slide-toggle').eq(0).click();
                        cy.get('.mat-input-element').eq(0).clear().type(fillageSetPoint);
                        cy.get('.mat-input-element').eq(1).clear().type(allowedStroke);
                        cy.get('.mat-input-element').eq(2).clear().type(startUpStroke);
                        cy.get('.mat-select').eq(2).click().type('02').type('{enter}');
                        cy.get('.mat-slide-toggle').eq(0).click();
                        cy.get('.mat-input-element').eq(3).clear().type(secondaryFillageSetPoint);
                        cy.get('#saveControl').click();
                        cy.wait(3000);
                        cy.reload();
                        cy.wait(4000);
                        onOffModbusUnit(1);
                        checkStatus();
                    }
                })
        }

        function onOffModbusUnit(checkBox) {
            cy.url().then((e) => {
                const lastIndexOfSpace = e.lastIndexOf('/');
                cy.visit(e.substring(0, lastIndexOfSpace) + '/developer');
            });
            cy.get(".mat-raised-button").eq(1).click();
            cy.get('.mat-checkbox-input').eq(21)
                .invoke('val', 'aria-checked')
                .then(async (e) => {
                    if ((e[0].checked && checkBox === 0) || (!e[0].checked && checkBox === 1)) {
                        cy.get('mat-checkbox[formcontrolname="modbusMapUnitConfigIsActive"]').click();
                    }
                });
            cy.get(".mat-flat-button").eq(1).click();
            cy.wait(2000);
            cy.get(".mat-flat-button").eq(0).click();
            cy.get('.sis-tabs__item').contains('Control Setup').click();
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
                cy.get('#logOutId').click({force: true});
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
