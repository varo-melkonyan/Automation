describe('GreenShot Configuration', () => {
    const validLogin = "varazdat.gm@ovaktechnologies.com";    //valid login
    const validPassword = "Aa1234$#@!";                       //valid password
    const wellName = "Test1234";                         //Well name
    const configMode = ["Greenshot", "Well Manager", "Greenshot and Well Manager"];
    let currentMode = 1;

    let firstChange = {};
    let secondChange = {};

    it('POC config parameters', () => {
        let data = [];
        // get data
        cy.fixture('../e2e/Save parameters/Greenshot Config/assets/data_GreenShot_config')
            .then(async (e) => {
                data.push(e);
            });

        // test commands
        function commands() {
            cy.get('.well-list__group').contains(wellName).click();
            cy.wait(1000);
            cy.get('button[class=mat-button-toggle-button]').contains('Greenshot').click();
            cy.get('.sis-tabs__item').contains('System Parameters').click();
            configurationCommands();
        }

        async function configurationCommands() {
            cy.get('body').then(async () => {
                // configMode
                await cy.get('.expand-collapse__button').click();
                await cy.wait(1000);
                await changeValues(0);
                await cy.wait(2000);
                await changeValues(1);
            });
        }


        //change parameters
        async function changeValues(range) {
            await cy.get('.mat-input-element').then(() => {
                let allValues = Object.values(data[0][0].GreenShot_Config);
                if ((range === 1 && currentMode === 1) || (range === 1 && currentMode === 2) || (range === 0 && currentMode === 2)) {
                    cy.get('.sis-delete-row').eq(1).click();
                }
                //withoutpassword
                for (let i = 0; i < allValues.length; i++) {
                    if (i === 3) {
                        continue;
                    }
                    cy.get('.mat-input-element').eq(i)
                        .clear({force: true}).type(allValues[i][range], {force: true});
                }
            });
            cy.get('#saveSysParam').click();
            cy.wait(3000);
            await changeOPMode(range);
        }

        async function changeOPMode(range) {
            if (currentMode === 1) {
                await cy.get('.expand-collapse__label').click();
                await cy.get('.mat-radio-label').eq(1).click({force: true});
                await cy.get('.mat-raised-button').click();
                await cy.reload();
                await cy.get('.sis-tabs__item').contains('Configuration').click();
                await cy.get('.expand-collapse__label').click();
                await cy.get('.mat-radio-outer-circle').eq(0).click({force: true});
                await cy.pause();
                await cy.get('#saveConfig').click();
                await cy.reload();
                await cy.get('.sis-tabs__item').contains('System Parameters').click();
                await cy.get('.expand-collapse__label').click();
            } else if (currentMode === 2) {
                await cy.get('.expand-collapse__label').click();
                await cy.get('.mat-radio-label').eq(2).click({force: true});
                await cy.get('.mat-raised-button').click();
                await cy.reload();
                await cy.get('button[class=mat-button-toggle-button]').contains('Well Manager').click();
                await cy.get('.sis-tabs__item').contains('Configuration').click();
                await cy.get('.expand-collapse__label').click();
                await cy.get('.mat-radio-outer-circle').eq(0).click({force: true});
                await cy.get('.mat-raised-button').click();
                await cy.reload();
                await cy.get('.sis-tabs__item').contains('System Parameters').click();
                await cy.get('.expand-collapse__label').click();
            }

            await cy.get('.mat-input-element').then(async () => {
                if (range === 0) {
                    await getValues(range, firstChange);
                } else if (range === 1) {
                    await getValues(range, secondChange);
                    await changeValues();
                }
            });
        }

        async function getValues(range, changedObj) {
            // Well settings params
            await cy.get('input[formcontrolname="displayName"]').then((e) => changedObj.displayName = e[0].value);
            await cy.get('input[formcontrolname="latitude"]').then((e) => changedObj.latitude = e[0].value);
            await cy.get('input[formcontrolname="longitude"]').then((e) => changedObj.longitude = e[0].value);
            // Gas, Oil And Environment Parameters
            await cy.get('input[formcontrolname="sfTemperature"]').then((e) => changedObj.sfTemperature = e[0].value);
            await cy.get('input[formcontrolname="specificHeatRatio"]').then((e) => changedObj.specificHeatRatio = e[0].value);
            await cy.get('input[formcontrolname="gasSpecificGravity"]').then((e) => changedObj.gasSpecificGravity = e[0].value);
            await cy.get('input[formcontrolname="gasCompressibilityDefault"]').then((e) => changedObj.gasCompressibilityDefault = e[0].value);
            await cy.get('input[formcontrolname="oilApiGravity"]').then((e) => changedObj.oilApiGravity = e[0].value);
            await cy.get('input[formcontrolname="atmosphericPressure"]').then((e) => changedObj.atmosphericPressure = e[0].value);
            await cy.get('input[formcontrolname="temperatureGradient"]').then((e) => changedObj.temperatureGradient = e[0].value);
            // Pump, Tubing and Casing parameters
            await cy.get('input[formcontrolname="distance"]').then((e) => changedObj.distance = e[0].value);
            await cy.get('input[formcontrolname="depth"]').then((e) => changedObj.depth = e[0].value);
            await cy.get('input[formcontrolname="kellyBushing"]').then((e) => changedObj.kellyBushing = e[0].value);
            await cy.get('input[formcontrolname="micDistance"]').then((e) => changedObj.micDistance = e[0].value);
            await cy.get('.mat-checkbox-input').eq(0).invoke('val', 'aria-checked').then(async (e) => {
                if (e[0].checked) {
                    await cy.get('input[formcontrolname="tubingAnchorDepth"]').then((e) => changedObj.tubingAnchorDepth = e[0].value);
                } else {
                    await cy.get('.mat-checkbox-input').eq(0).check({force: true});
                    await cy.get('input[formcontrolname="tubingAnchorDepth"]').then((e) => changedObj.tubingAnchorDepth = e[0].value);
                }
            });
            await cy.get('.mat-input-element').eq(16).then((e) => changedObj.tubing_lengths = e[0].value);
            await cy.get('.mat-input-element').eq(17).then((e) => changedObj.tubing_innerDiameters = e[0].value);
            await cy.get('.mat-input-element').eq(18).then((e) => changedObj.tubing_outerDiameters = e[0].value);
            await cy.get('.mat-input-element').eq(19).then((e) => changedObj.tubing_jointCounts = e[0].value);
            await cy.get('.mat-input-element').eq(20).then((e) => changedObj.casing_lengths = e[0].value);
            await cy.get('.mat-input-element').eq(21).then((e) => changedObj.casing_innerDiameters = e[0].value);
            //Shot Settings
            await cy.get('input[formcontrolname="gpBuildupReadyDuration"]').then((e) => changedObj.gpBuildupReadyDuration = e[0].value);
            await cy.get('input[formcontrolname="flBuildupReadyPressureRise"]').then((e) => changedObj.flBuildupReadyPressureRise = e[0].value);
            await cy.get('input[formcontrolname="avBuildupReadyPressureRise"]').then((e) => changedObj.avBuildupReadyPressureRise = e[0].value);
            await cy.get('input[formcontrolname="avBandpassFilterFirstCutoffFrequency"]').then((e) => changedObj.avBandpassFilterFirstCutoffFrequency = e[0].value);
            await cy.get('input[formcontrolname="avBandpassFilterSecondCutoffFrequency"]').then((e) => changedObj.avBandpassFilterSecondCutoffFrequency = e[0].value);
            //System Settings
            await cy.get('.mat-select').eq(9).then(async (e) => {
                if (e[0].innerText === "Operator Defined") {
                    await cy.get('input[formcontrolname="acousticVelocityPointingValue"]').then((e) => changedObj.acousticVelocityPointingValue = e[0].value);
                } else {
                    await cy.get('input[formcontrolname="acousticVelocityPointingValue"]').click().type("Operator Defined").type('{enter}');
                    await cy.get('input[formcontrolname="acousticVelocityPointingValue"]').then((e) => changedObj.acousticVelocityPointingValue = e[0].value);
                }
            })
            await cy.get('input[formcontrolname="acousticVelocityPointingValueDeltaRate"]').then((e) => changedObj.acousticVelocityPointingValueDeltaRate = e[0].value);
            await cy.get('input[formcontrolname="avSegmentStartTime"]').then((e) => changedObj.avSegmentStartTime = e[0].value);
            await cy.get('input[formcontrolname="avSegmentEndTime"]').then((e) => changedObj.avSegmentEndTime = e[0].value);
            await cy.get('input[formcontrolname="pipDeltaWarningLevel"]').then((e) => changedObj.pipDeltaWarningLevel = e[0].value);
            await cy.get('input[formcontrolname="flDeltaWarningLevel"]').then((e) => changedObj.flDeltaWarningLevel = e[0].value);
            //End Device Settings
            await cy.get('input[formcontrolname="highPressureSafetyValveSetPoint"]').then((e) => changedObj.highPressureSafetyValveSetPoint = e[0].value);
            await cy.get('.mat-checkbox-input').eq(1).invoke('val', 'aria-checked').then(async (e) => {
                if (e[0].checked) {
                    await cy.get('input[formcontrolname="highPressureSafetyValveThreshold"]').then((e) => changedObj.highPressureSafetyValveThreshold = e[0].value);
                } else {
                    await cy.get('.mat-checkbox-input').eq(1).check({force: true});
                    await cy.get('input[formcontrolname="highPressureSafetyValveThreshold"]').then((e) => changedObj.highPressureSafetyValveThreshold = e[0].value);
                }
            });
            await cy.get('.mat-checkbox-input').eq(2).invoke('val', 'aria-checked').then(async (e) => {
                if (e[0].checked) {
                    await cy.get('input[formcontrolname="diffPressureSafetyValveThreshold"]').then((e) => changedObj.diffPressureSafetyValveThreshold = e[0].value);
                } else {
                    await cy.get('.mat-checkbox-input').eq(2).check({force: true});
                    await cy.get('input[formcontrolname="diffPressureSafetyValveThreshold"]').then((e) => changedObj.diffPressureSafetyValveThreshold = e[0].value);
                }
            });


            await cy.get('.mat-input-element').then(async () => {
                if (range === 1) {
                    await checkValues();
                }
            });
        }

        //check values
        async function checkValues() {
            for (let i = 0; i < Object.values(firstChange).length; i++) {
                if (Object.values(firstChange)[i] === Object.values(secondChange)[i]) {
                    cy.log(Object.values(firstChange));
                    cy.log(Object.values(secondChange));
                    cy.log(Object.values(secondChange)[i]);
                    cy.log(i);
                    console.log(Object.values(firstChange));
                    console.log(Object.values(secondChange));
                    console.log(Object.values(secondChange)[i]);
                    console.log(i);
                    cy.pause();
                }
            }

            if (currentMode < configMode.length - 1) {
                firstChange = {};
                secondChange = {};
                currentMode += 1;
                await configurationCommands();
            } else {
                cy.log("Finish");
                console.log("Finish");
                alert("Finish");
            }
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
