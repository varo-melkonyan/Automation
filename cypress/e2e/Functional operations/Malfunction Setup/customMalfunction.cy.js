describe('Custom Malfunction', () => {
    const validLogin = "varazdat.gm@ovaktechnologies.com";    //valid login
    const validPassword = "Aa1234$#@!";                       //valid password
    const wellName = "KWM+ 135";                         //Well name

    const analogSetPoint = 40;
    const violation = 1;
    const retries = 1;
    const retriesTime = "01";
    const analogHaveText = "0.00";

    const secondRetries = 3;
    const secondRetriesTime = 2;

    it('Check the work of Custom Malfunction', () => {
        // test commands
        function commands() {
            cy.get('.well-list__group').contains(wellName).click();
            cy.wait(1000);
            cy.get('button[class=mat-button-toggle-button]').contains('Well Manager').click();
            onOffModbusUnit(0);
            malfunctionSetupCommands();
        }

        async function malfunctionSetupCommands() {
            await setCustomAnalogMalf();
            cy.get('body').then(async () => {
                await cy.get('.footer-status__value').eq(2).as('wellState');
                await cy.get('.footer-status__value').eq(2).then(async (e) => {
                    if (e[0].innerText !== "Stopped") {
                        await cy.get("@wellState", {timeout: 80000}).should('have.text', "Stopping");
                    }
                })
                await cy.get("@wellState", {timeout: 180000}).should('have.text', "Stopped");
                await cy.get(".footer-status__value").eq(4).should('have.text', "I/O Malfunction");
                await cy.get('.sis-tabs__item').contains('I/O').click();
                await cy.get('.sys-accordion__title').eq(1).click();
                await cy.wait(1000);
                await cy.get('.sys-accordion__grid-item--value').eq(9).should('have.text', analogHaveText);
                await cy.get('.sys-accordion__title').eq(0).click();
                await cy.get('.sys-accordion__grid-item--value').eq(0).then((e) => {
                    let oldValue;
                    oldValue = e[0].innerText;
                    cy.wait(5000);
                    if (oldValue >= e[0].innerText) {
                        cy.log(true);
                    } else {
                        cy.pause();
                    }
                });
                await cy.get('.sis-tabs__item').contains('Malfunction Setup').click();
                await cy.get(".malf-current-retries", {timeout: parseInt(retriesTime) + 16000}).eq(4).should('not.have.text', "0");
                await cy.get('.mat-checkbox-input').eq(4).click({force: true});
                await cy.get('#saveMalf').click();
                await cy.wait(3000);
                await cy.get('.malfunction-button').click({force: true});
                await cy.wait(2000);
                await setCustomDigitalMalf();
            });
        }

        async function setCustomAnalogMalf() {
            await cy.get('.sis-tabs__item').contains('I/O').click();

            //add new custom analog
            await cy.get('.sys-accordion__header').eq(1).contains(' + Add New ').click();
            await cy.get('.mat-checkbox-input').check({force: true});
            await cy.get('input[formcontrolname="name"]').clear().type("Custom Analog");
            await cy.get('.mat-select').eq(0).click().get('.mat-option').contains("Module SYNC 1").click();
            await cy.get('.mat-select').eq(1).click().get('.mat-option').contains("AO 01").click();
            await cy.get('.mat-select').eq(2).click().get('.mat-option').contains("0-10V").click();
            await cy.get('.mat-select').eq(3).click().get('.mat-option').contains("Hz").click();
            await cy.get('input[formcontrolname="y1"]').clear().type(0);
            await cy.get('input[formcontrolname="y2"]').clear().type(60);
            await cy.get('.io-add-malf').click();
            await cy.get('.mat-checkbox-input').eq(1).check({force: true});
            await cy.get('.mat-select').eq(4).click().get('.mat-option').contains("Min").click();
            await cy.get('input[formcontrolname="value"]').clear().type(analogSetPoint);
            await cy.get('input[formcontrolname="thresholdDuration"]').clear().type(violation);
            await cy.get('input[formcontrolname="malfunctionLimit"]').clear().type(retries);
            await cy.get('.mat-input-element').eq(7).clear().type(retriesTime);
            await cy.get('.mat-flat-button').eq(1).click();

            await cy.wait(2000);

            await cy.get('.sis-tabs__item').contains('Malfunction Setup').click();
        }

        async function setCustomDigitalMalf() {
            await cy.get('.sis-tabs__item').contains('I/O').click();

            //add new custom digital
            await cy.get('.sys-accordion__header').eq(2).contains(' + Add New ').click();
            await cy.get('.mat-checkbox-input').check({force: true});
            await cy.get('input[formcontrolname="name"]').clear().type("Custom Digital");
            await cy.get('.mat-select').eq(0).click().get('.mat-option').contains("Module 8DI/8DO").click();
            await cy.get('.mat-select').eq(1).click().get('.mat-option').contains("DO 04").click();
            await cy.get('.io-add-malf').click();
            await cy.get('.mat-checkbox-input').eq(1).check({force: true});
            await cy.get('.mat-select').eq(2).click().get('.mat-option').contains("False (opened)").click();
            await cy.get('input[formcontrolname="thresholdDuration"]').clear().type(violation);
            await cy.get('input[formcontrolname="malfunctionLimit"]').clear().type(secondRetries);
            await cy.get('.mat-input-element').eq(4).clear().type(secondRetriesTime);
            await cy.get('.mat-flat-button').eq(1).click();

            await cy.wait(2000);

            await cy.get('.sis-tabs__item').contains('Malfunction Setup').click();
            await checkSecondary();
        }

         function checkSecondary() {
            cy.get('body').then(async () => {
                await cy.get('.footer-status__value').eq(2).as('wellState');
                await cy.get('.footer-status__value').eq(2).then((e) => {
                    if (e[0].innerText !== "Stopped") {
                        cy.get("@wellState", {timeout: 80000}).should('have.text', "Stopping");
                    }
                })
                await cy.get("@wellState", {timeout: 1820000}).should('have.text', "Stopped");
                await cy.get(".footer-status__value").eq(4).should('have.text', "I/O Violation");
                await cy.get('.sis-tabs__item').contains('I/O').click();
                await cy.get('.sys-accordion__title').eq(2).click();
                await cy.wait(1000);
                await cy.get('.sys-accordion__grid-item--value').eq(13).should('have.text', "0");
                await cy.get('.sys-accordion__title').eq(0).click();
                await cy.get('.sys-accordion__grid-item--value').eq(0).then((e) => {
                    let oldValue;
                    oldValue = e[0].innerText;
                    cy.wait(5000);
                    if (oldValue >= e[0].innerText) {
                        cy.log(true);
                    } else {
                        cy.pause();
                    }
                });
                await cy.get('.sis-tabs__item').contains('Malfunction Setup').click();
                await cy.get('.malf-current-retries').eq(5).as('malfRetries');
                await cy.get("@malfRetries", {timeout: (secondRetriesTime * 60000 * secondRetries)}).should('have.text', secondRetries);
                await cy.get(".footer-status__value").eq(4).should('have.text', "I/O Malfunction");
                await onOffModbusUnit(1);
                await cy.wait(2000);
                await cy.get('.mat-checkbox-input').eq(5).click({force: true});
                await cy.get('#saveMalf').click();
                await cy.wait(3000);
                await cy.get('.malfunction-button').click({force: true});
            });
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
            cy.get('.sis-tabs__item').contains('Malfunction Setup').click();
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
