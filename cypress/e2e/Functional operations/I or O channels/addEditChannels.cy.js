const {func} = require("assert-plus");

describe('Custom Malfunction', () => {
    const validLogin = "varazdat.gm@ovaktechnologies.com";    //valid login
    const validPassword = "Aa1234$#@!";                       //valid password
    const wellName = "KWM+ 135";                         //Well name

    let customMalf = 0;

    it('Check the work of Custom Malfunction', () => {
        // test commands
        function commands() {
            cy.get('.well-list__group').contains(wellName).click();
            cy.wait(1000);
            cy.get('button[class=mat-button-toggle-button]').contains('Well Manager').click();
            onOffModbusUnit(0);
            setChannels();
        }

        async function setChannels() {
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
            await cy.get('input[formcontrolname="value"]').clear().type(20);
            await cy.get('input[formcontrolname="thresholdDuration"]').clear().type(2);
            await cy.get('input[formcontrolname="malfunctionLimit"]').clear().type(4);
            await cy.get('.mat-input-element').eq(7).clear().type(1);
            await cy.get('.mat-flat-button').eq(1).click();

            await cy.wait(2000);

            //add VFD Speed Channel
            await cy.get('.sys-accordion__header').eq(1).contains(' + Add New ').click();
            await cy.get('.mat-select').eq(0).click().get('.mat-option').contains("VFD Speed").click();
            await cy.get('.mat-select').eq(1).click().get('.mat-option').contains("Module SYNC 1").click();
            await cy.get('.mat-select').eq(2).click().get('.mat-option').contains("AO 01").click();
            await cy.get('.mat-select').eq(3).click().get('.mat-option').contains("0-10V").click();
            await cy.get('.mat-select').eq(4).click().get('.mat-option').contains("Hz").click();
            await cy.get('input[formcontrolname="y1"]').clear().type(0);
            await cy.get('input[formcontrolname="y2"]').clear().type(60);
            await cy.get('.mat-flat-button').eq(1).click();

            await cy.wait(2000);

            //add new custom digital
            await cy.get('.sys-accordion__header').eq(2).contains(' + Add New ').click();
            await cy.get('.mat-checkbox-input').check({force: true});
            await cy.get('input[formcontrolname="name"]').clear().type("Custom Digital");
            await cy.get('.mat-select').eq(0).click().get('.mat-option').contains("Module 8DI/8DO").click();
            await cy.get('.mat-select').eq(1).click().get('.mat-option').contains("DO 04").click();
            await cy.get('.io-add-malf').click();
            await cy.get('.mat-checkbox-input').eq(1).check({force: true});
            await cy.get('.mat-select').eq(2).click().get('.mat-option').contains("False (opened)").click();
            await cy.get('input[formcontrolname="thresholdDuration"]').clear().type(1);
            await cy.get('input[formcontrolname="malfunctionLimit"]').clear().type(3);
            await cy.get('.mat-input-element').eq(4).clear().type(1);
            await cy.get('.mat-flat-button').eq(1).click();

            await cy.wait(2000);

            //add new motor channel digital
            await cy.get('.sys-accordion__header').eq(2).contains(' + Add New ').click();
            await cy.get('.mat-checkbox-input').check({force: true});
            await cy.get('input[formcontrolname="name"]').clear().type("Custom Digital");
            await cy.get('.mat-select').eq(0).click().get('.mat-option').contains("Module 8DI/8DO").click();
            await cy.get('.mat-select').eq(1).click().get('.mat-option').contains("DO 04").click();
            await cy.get('.mat-flat-button').eq(1).click();
            await changeOPMode();
            await checkAddChannels();
        }

        async function changeOPMode() {
            await cy.get('.expand-collapse__label').click();
            await cy.get('.mat-radio-label').eq(0).click({force: true});
            await cy.get('.mat-raised-button').eq(0).click();
            await cy.reload();
            await cy.get('.sis-tabs__item').contains('System Parameters').click();
            await cy.get('.expand-collapse__label').click();
            await cy.get('.mat-radio-outer-circle').eq(2).click({force: true});
            await cy.get('#saveSysParam').click();
            await cy.reload();
            await cy.get('button[class=mat-button-toggle-button]').contains('Well Manager').click();
            await cy.get('.sis-tabs__item').contains('Configuration').click();
            await cy.get('.expand-collapse__label').click();
        }

        async function checkAddChannels() {

        }

        async function checkEditChannels() {

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
            cy.get('.sis-tabs__item').contains('I/O').click();
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
