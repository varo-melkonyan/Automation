describe('VFD', () => {
    const validLogin = "varazdat.gm@ovaktechnologies.com";    //valid login
    const validPassword = "Aa1234$#@!";                       //valid password
    const wellName = "KWM+ 135";                         //Well name

    const fillageSetPoint = 90;
    const allowedStroke = 2;
    const startUpStroke = 2;
    const secondaryFillageSetPoint = 80;

    let constantSpeed = 0;

    it('Check the work of VFD without Speed Zones', () => {
        // test commands
        function commands() {
            cy.get('.well-list__group').contains(wellName).click();
            cy.wait(1000);
            cy.get('button[class=mat-button-toggle-button]').contains('Well Manager').click();
            onOffModbusUnit(0);
            controlSetupVFDCommands();
        }

        async function controlSetupVFDCommands() {
            await cy.get('.sis-tabs__item').contains('I/O').click({force: true});
            await cy.wait(7000);

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

            await cy.get('.sis-tabs__item').contains('Control Setup').click({force: true});

            await hostModeVFDStatus();
            await fillageModeVFDStatus();
        }

        async function hostModeVFDStatus() {
            //Check Host mode time VFD status
            await cy.get('.mat-select').eq(0).click();
            await cy.get('.mat-option-text').contains("Host").click();
            await cy.get('[formgroupname="vfdUse"] .mat-slide-toggle-input')
                .invoke('val', 'aria-checked')
                .then(async (e) => {
                    if (e[0].checked) {
                        onOffModbusUnit(1);
                        await cy.get('input[formcontrolname="constantSpeed"]')
                            .then((e) => constantSpeed = e[0].value);
                        checkStatus(0);
                    } else {
                        await cy.get('.mat-slide-toggle').eq(0).click();
                        cy.get('#saveControl').click();
                        cy.wait(3000);
                        cy.reload();
                        onOffModbusUnit(1);
                        checkStatus(0);
                    }
                })
        }

        async function fillageModeVFDStatus() {
            onOffModbusUnit(0);
            await cy.get('.mat-select').eq(0).click();
            await cy.get('.mat-option-text').contains("Fillage").click();
            await cy.wait(3000);
            await cy.get('[formgroupname="vfdUse"] .mat-slide-toggle-input')
                .invoke('val', 'aria-checked')
                .then(async (e) => {
                    if (!e[0].checked) {
                        await cy.get('.mat-slide-toggle').eq(0).click();
                        await cy.get('.mat-input-element').eq(0).clear().type(fillageSetPoint);
                        await cy.get('.mat-input-element').eq(1).clear().type(allowedStroke);
                        await cy.get('.mat-input-element').eq(2).clear().type(startUpStroke);
                        await cy.get('.mat-select').eq(2).click().type('02').type('{enter}');
                        await cy.get('.mat-slide-toggle').eq(0).click();
                        // await cy.get('.mat-input-element').eq(3).clear().type(secondaryFillageSetPoint);
                        await cy.get('#saveControl').click();
                        await cy.wait(3000);
                        await cy.reload();
                        await cy.wait(4000);
                        onOffModbusUnit(1);
                        checkStatus(1);
                    }
                })
        }

        function checkStatus(modeIndex) {
            cy.get('body').then(async () => {
                if (modeIndex === 0) {
                    await cy.get('.sis-tabs__item').contains('I/O').click({force: true});
                    await cy.wait(5000);
                    await cy.get('.sys-accordion__title').eq(1).click();
                    await cy.wait(2000);
                    await cy.get('.sys-accordion__grid-item--value').eq(10).should('contain.text', constantSpeed);
                }
                else if (modeIndex === 1) {

                }
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
