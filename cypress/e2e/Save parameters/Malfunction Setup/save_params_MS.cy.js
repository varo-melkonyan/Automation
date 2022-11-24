describe('Malfunction setup', () => {
    const validLogin = "varazdat.gm@ovaktechnologies.com";    //valid login
    const validPassword = "Aa1234$#@!";                       //valid password
    const wellName = "TestWell";                         //Well name
    const controlMode = ["Default", "Custom"];
    let currentMode = 0;
    let defaultMalfunctionCount = 4;

    let firstChange = {};
    let secondChange = {};

    it('Save malfunction setup parameters', () => {
        let data = [];
        // get data
        cy.fixture('../e2e/Save parameters/Malfunction Setup/assets/data_MS')
            .then(async (e) => {
                data.push(e);
            });

        // test commands
        function commands() {
            cy.get('.well-list__group').contains(wellName).click();
            cy.wait(1000);
            cy.get('button[class=mat-button-toggle-button]').contains('Well Manager').click();
            cy.get('.sis-tabs__item').contains('Malfunction Setup').click();
            malfunctionSetupCommands();
        }

        async function malfunctionSetupCommands() {
            cy.get('body').then(async () => {
                await changeValues(0);
                await cy.wait(2000);
                await changeValues(1);
            });
        }


        //change parameters
        async function changeValues(range) {
            await cy.get('.mat-input-element').then(() => {
                let valuesMaximumLoad = Object.values(data[0][0].Maximum_Load);
                let valuesMinimum_Load = Object.values(data[0][0].Minimum_Load);
                let valuesMalfunction_Point = Object.values(data[0][0].Malfunction_Point);
                let valuesLow_Fluid_Load = Object.values(data[0][0].Low_Fluid_Load);
                let valuesCustom_Malfuntion = Object.values(data[0][1].Custom_Malfuntion);

                if (controlMode[currentMode] === "Default") {
                    cy.get('.mat-checkbox-input').as('checkboxes').check({force: true});
                    cy.get('.mat-checkbox-input').as('checkboxes').then(async (e) => {
                        if (e.length <= defaultMalfunctionCount) {
                            for (let i = 0; i < valuesMaximumLoad.length; i++) {
                                cy.get('.mat-input-element').eq(i)
                                    .clear().type(valuesMaximumLoad[i][range]);
                            }
                            for (let j = 0; j < valuesMinimum_Load.length; j++) {
                                cy.get('.mat-input-element').eq(valuesMaximumLoad.length + j)
                                    .clear().type(valuesMinimum_Load[j][range]);
                            }
                            for (let k = 0; k < valuesMalfunction_Point.length; k++) {
                                cy.get('.mat-input-element').eq(valuesMinimum_Load.length + valuesMaximumLoad.length + k)
                                    .clear().type(valuesMalfunction_Point[k][range]);
                            }
                            for (let h = 0; h < valuesLow_Fluid_Load.length; h++) {
                                cy.get('.mat-input-element').eq(valuesMinimum_Load.length + valuesMaximumLoad.length + valuesMalfunction_Point.length + h)
                                    .clear().type(valuesLow_Fluid_Load[h][range]);
                            }
                        }
                    });
                } else if (controlMode[currentMode] === "Custom") {
                    cy.get('.mat-input-element').then(async () => {
                        if (range === 0) {
                            await setCustomMalf();
                        }
                    });
                    cy.wait(2000);
                    cy.get('.mat-input-element').then(async () => {
                        for (let i = 0; i < valuesMaximumLoad.length; i++) {
                            cy.get('.mat-input-element').eq(i)
                                .clear().type(valuesMaximumLoad[i][range]);
                        }
                        for (let j = 0; j < valuesMinimum_Load.length; j++) {
                            cy.get('.mat-input-element').eq(valuesMaximumLoad.length + j)
                                .clear().type(valuesMinimum_Load[j][range]);
                        }
                        for (let k = 0; k < valuesMalfunction_Point.length; k++) {
                            cy.get('.mat-input-element').eq(valuesMinimum_Load.length + valuesMaximumLoad.length + k)
                                .clear().type(valuesMalfunction_Point[k][range]);
                        }
                        for (let h = 0; h < valuesLow_Fluid_Load.length; h++) {
                            cy.get('.mat-input-element').eq(valuesMinimum_Load.length + valuesMaximumLoad.length + valuesMalfunction_Point.length + h)
                                .clear().type(valuesLow_Fluid_Load[h][range]);
                        }
                        for (let w = 0; w < valuesCustom_Malfuntion.length; w++) {
                            cy.get('.mat-input-element')
                                .eq(valuesMinimum_Load.length + valuesMaximumLoad.length + valuesMalfunction_Point.length + valuesLow_Fluid_Load.length + w)
                                .clear().type(valuesCustom_Malfuntion[w][range]);
                        }
                    });
                }
            });
            cy.get('#saveMalf').click();
            cy.wait(3000);
            cy.reload();
            cy.get('.mat-input-element').then(async () => {
                if (range === 0) {
                    await getValues(range, firstChange);
                } else if (range === 1) {
                    await getValues(range, secondChange);
                    await changeValues();
                }
            });
        }

        async function setCustomMalf() {
            await cy.get('.mat-checkbox-input').as('checkboxes').check({force: true})
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
            await cy.get('input[formcontrolname="value"]').clear().type(20);
            await cy.get('input[formcontrolname="thresholdDuration"]').clear().type(2);
            await cy.get('input[formcontrolname="malfunctionLimit"]').clear().type(4);
            await cy.get('.mat-input-element').eq(7).clear().type(1);
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
            await cy.get('.mat-select').eq(2).click().get('.mat-option').contains("True (closed)").click();
            await cy.get('input[formcontrolname="thresholdDuration"]').clear().type(1);
            await cy.get('input[formcontrolname="malfunctionLimit"]').clear().type(3);
            await cy.get('.mat-input-element').eq(4).clear().type(1);
            await cy.get('.mat-flat-button').eq(1).click();

            await cy.wait(2000);

            await cy.get('.sis-tabs__item').contains('Malfunction Setup').click();
        }

        //check values
        async function checkValues() {
            for (let i = 0; i < Object.values(firstChange).length; i++) {
                if (Object.values(firstChange)[i] === Object.values(secondChange)[i]) {
                    cy.log(Object.values(firstChange), "Default values");
                    cy.log(Object.values(secondChange), "Changed values");
                    cy.log(Object.values(secondChange)[i], "Input value");
                    cy.log(i, "Index value");
                    console.log(Object.values(firstChange), "Default values");
                    console.log(Object.values(secondChange), "Changed values");
                    console.log(Object.values(secondChange)[i], "Input value");
                    console.log(i, "Index value");
                    cy.pause();
                }
            }

            if (currentMode < controlMode.length - 1) {
                firstChange = {};
                secondChange = {};
                currentMode += 1;
                await malfunctionSetupCommands();
            } else {
                cy.pause();
                cy.log("Finish");
                console.log("Finish");
                alert("Finish");
            }
        }

        // control setup inputs values
        async function getValues(range, changedObj) {
            await cy.get('.mat-input-element').eq(0).then((e) => changedObj.maxPoint = e[0].value);
            await cy.get('.mat-input-element').eq(1).then((e) => changedObj.maxViolation = e[0].value);
            await cy.get('.mat-input-element').eq(2).then((e) => changedObj.maxRetries = e[0].value);
            await cy.get('.mat-input-element').eq(3).then((e) => changedObj.maxRetriesTimeHR = e[0].value);
            await cy.get('.mat-input-element').eq(4).then((e) => changedObj.maxRetriesTimeMin = e[0].value);
            await cy.get('.mat-input-element').eq(5).then((e) => changedObj.minPoint = e[0].value);
            await cy.get('.mat-input-element').eq(6).then((e) => changedObj.minViolation = e[0].value);
            await cy.get('.mat-input-element').eq(7).then((e) => changedObj.minRetries = e[0].value);
            await cy.get('.mat-input-element').eq(8).then((e) => changedObj.minRetriesTimeHR = e[0].value);
            await cy.get('.mat-input-element').eq(9).then((e) => changedObj.minRetriesTimeMin = e[0].value);
            await cy.get('.mat-input-element').eq(10).then((e) => changedObj.malfPointLoad = e[0].value);
            await cy.get('.mat-input-element').eq(11).then((e) => changedObj.malfPointPos = e[0].value);
            await cy.get('.mat-input-element').eq(11).then((e) => changedObj.malfPointViolation = e[0].value);
            await cy.get('.mat-input-element').eq(12).then((e) => changedObj.malfPointRetries = e[0].value);
            await cy.get('.mat-input-element').eq(13).then((e) => changedObj.malfPointRetriesTimeHR = e[0].value);
            await cy.get('.mat-input-element').eq(14).then((e) => changedObj.malfPointRetriesTimeMin = e[0].value);
            await cy.get('.mat-input-element').eq(15).then((e) => changedObj.lowFluidPoint = e[0].value);
            await cy.get('.mat-input-element').eq(16).then((e) => changedObj.lowFluidViolation = e[0].value);
            await cy.get('.mat-input-element').eq(17).then((e) => changedObj.lowFluidRetries = e[0].value);
            await cy.get('.mat-input-element').eq(18).then((e) => changedObj.lowFluidRetriesTimeHR = e[0].value);
            await cy.get('.mat-input-element').eq(19).then((e) => changedObj.lowFluidRetriesTimeMin = e[0].value);

            await cy.get('.mat-checkbox-input').as('checkboxes').then(async (e) => {
                if (e.length > defaultMalfunctionCount) {
                    await cy.get('.mat-input-element').eq(20).then((e) => changedObj.customAnPoint = e[0].value);
                    await cy.get('.mat-input-element').eq(21).then((e) => changedObj.customAnViolation = e[0].value);
                    await cy.get('.mat-input-element').eq(22).then((e) => changedObj.customAnRetries = e[0].value);
                    await cy.get('.mat-input-element').eq(23).then((e) => changedObj.customAnRetriesTimeHR = e[0].value);
                    await cy.get('.mat-input-element').eq(24).then((e) => changedObj.customAnRetriesTimeMin = e[0].value);
                    await cy.get('.mat-input-element').eq(25).then((e) => changedObj.customDiPoint = e[0].value);
                    await cy.get('.mat-input-element').eq(26).then((e) => changedObj.customDiViolation = e[0].value);
                    await cy.get('.mat-input-element').eq(27).then((e) => changedObj.customDiRetries = e[0].value);
                    await cy.get('.mat-input-element').eq(28).then((e) => changedObj.customDiRetriesTimeHR = e[0].value);
                    await cy.get('.mat-input-element').eq(29).then((e) => changedObj.customDiRetriesTimeMin = e[0].value);
                }
            });
            await cy.get('.mat-checkbox-input').as('checkboxes').then(async () => {
                if (range === 1) {
                    await checkValues();
                }
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
        cy.visit('http://104.211.19.125:8181/');
        cy.clearCookies();
        cy.wait(2000);
        cy.url().then((url) => {
            cy.log(url);
            if ((url === 'https://automation.wellworxenergy.com/')) {
                loginPage();
                cy.wait(3000);
                cy.get('body').type('{shift}{ctrl}');
                cy.get('.devMode').contains('Open Sesame').click();
                commands();
            } else {
                cy.get('.sis-account__button').click();
                cy.get('#logOutId').click();
                cy.wait(2000);
                cy.url().should("eq", "https://automation.wellworxenergy.com/");
                loginPage();
                cy.wait(3000);
                cy.get('body').type('{shift}{ctrl}');
                cy.get('.devMode').contains('Open Sesame').click();
                commands();
            }
        })
    })
})
