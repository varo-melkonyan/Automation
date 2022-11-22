describe('Malfunction setup', () => {
    const validLogin = "varazdat.gm@ovaktechnologies.com";    //valid login
    const validPassword = "Aa1234$#@!";                       //valid password
    const wellName = "TestWell";                         //Well name
    const controlMode = ["Default", "Custom"];
    let currentMode = 0;

    let firstChange = {};
    let secondChange = {};

    it('Save malfunction setup parameters', () => {
        let data = [];
        // get data
        cy.fixture('../e2e/Malfunction Setup/assets/data_MS')
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
            range = 0
            await cy.get('.mat-input-element').then(() => {
                let valuesMaximumLoad = Object.values(data[0][0].Maximum_Load);
                let valuesMinimum_Load = Object.values(data[0][0].Minimum_Load);
                let valuesMalfunction_Point = Object.values(data[0][0].Malfunction_Point);
                let valuesLow_Fluid_Load = Object.values(data[0][0].Low_Fluid_Load);
                let valuesCustom_Malfuntion = Object.values(data[0][1].Custom_Malfuntion);

                if (controlMode[currentMode] === "Default") {
                    cy.get('.mat-checkbox-input').as('checkboxes').check({force: true})
                    cy.get('.mat-checkbox-input').as('checkboxes')
                        .invoke('val', 'aria-checked')
                        .then(async (e) => {
                            if (e[0].checked) {
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
                            } else {
                                await setCustomMalf();
                                for (let i = 0; i < valuesCustom_Malfuntion.length - 1; i++) {
                                    cy.get('.mat-input-element')
                                        .eq(valuesMinimum_Load.length + valuesMaximumLoad.length + valuesMalfunction_Point.length + valuesLow_Fluid_Load.length)
                                        .clear().type(valuesCustom_Malfuntion[i][range]);
                                }
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

            await cy.wait(1000);

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
        }

        //check values
        async function checkValues() {
            for (let i = 0; i < Object.values(firstChange).length; i++) {
                if (Object.values(firstChange)[i] === Object.values(secondChange)[i]) {
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
                alert("Finish")
            }
        }

        // control setup inputs values
        async function getValues(range, changedObj) {
            await cy.get('[formgroupname="vfdUse"] .mat-slide-toggle-input')
                .invoke('val', 'aria-checked')
                .then(async (e) => {
                    if (e[0].checked) {
                        await vfdOn(changedObj);
                    } else {
                        await vfdOff(changedObj);
                    }
                });
            await cy.get('input[formcontrolname="fluidFrictionRatio"]').then(async () => {
                if (range === 1) {
                    await checkValues();
                }
            });
        }

        async function vfdOn(changedObj) {
            if (controlMode[currentMode] === "Fillage") {
                await fillageMode(changedObj);
            } else if (controlMode[currentMode] === "PIP") {
                await pipMode(changedObj);
            } else {
                console.log(controlMode[currentMode]);
            }
            // Dynagraph Card Settings
            await cy.get('input[formcontrolname="fillBaseRatio"]').then((e) => changedObj.fillbase = e[0].value);
            await cy.get('input[formcontrolname="fluidDampingCoefficient"]').then((e) => changedObj.dampingFactor = e[0].value);
            await cy.get('input[formcontrolname="fluidFrictionRatio"]').then((e) => changedObj.mechanicalFriction = e[0].value);
            // VFD inputs values
            await cy.get('input[formcontrolname="speedMax"]').then((e) => changedObj.peakWorkingSpeed = e[0].value);
            await cy.get('input[formcontrolname="speedMin"]').then((e) => changedObj.minWorkingSpeed = e[0].value);
            await cy.get('input[formcontrolname="speedIncrease"]').then((e) => changedObj.speedIncrease = e[0].value);
            await cy.get('input[formcontrolname="speedDecrease"]').then((e) => changedObj.speedDecrease = e[0].value);
            await cy.get('input[formcontrolname="startupSpeed"]').then((e) => changedObj.startUpSpeed = e[0].value);
            await cy.get('input[formcontrolname="deadBandRate"]').then((e) => changedObj.deadBand = e[0].value);
            await cy.get('input[formcontrolname="deadBandTicks"]').then((e) => changedObj.deadBandStrokes = e[0].value);
            await cy.get('input[formcontrolname="constantSpeed"]').then((e) => changedObj.constantSpeed = e[0].value);
            await cy.get('input[formcontrolname="inverterRatedPower"]').then((e) => changedObj.inverterRatedPower = e[0].value);
            await cy.get('input[formcontrolname="motorRatedPower"]').then((e) => changedObj.motorRatedPower = e[0].value);
            // VFD Speed Zones
            await cy.get('[formgroupname="zoneControl"] .mat-checkbox-input').invoke('val', 'aria-checked').then(async (e) => {
                if (e[0].checked) {
                    await cy.get('input[formcontrolname="posnRate"]').eq(0).then((e) => changedObj.vfdSpeedZonePositionFirst = e[0].value);
                    await cy.get('input[formcontrolname="posnRate"]').eq(1).then((e) => changedObj.vfdSpeedZonePositionSecond = e[0].value);
                    await cy.get('input[formcontrolname="posnRate"]').eq(2).then((e) => changedObj.vfdSpeedZonePositionThird = e[0].value);
                    await cy.get('input[formcontrolname="posnRate"]').eq(3).then((e) => changedObj.vfdSpeedZonePositionFourth = e[0].value);
                    await cy.get('input[formcontrolname="speedRate"]').eq(0).then((e) => changedObj.vfdSpeedZoneSpeedFirst = e[0].value);
                    await cy.get('input[formcontrolname="speedRate"]').eq(1).then((e) => changedObj.vfdSpeedZoneSpeedSecond = e[0].value);
                    await cy.get('input[formcontrolname="speedRate"]').eq(2).then((e) => changedObj.vfdSpeedZoneSpeedThird = e[0].value);
                    await cy.get('input[formcontrolname="speedRate"]').eq(3).then((e) => changedObj.vfdSpeedZoneSpeedFourth = e[0].value);
                }
            });
        }

        async function vfdOff(changedObj) {
            if (controlMode[currentMode] === "Fillage") {
                await fillageMode(changedObj);
            } else if (controlMode[currentMode] === "PIP") {
                await pipMode(changedObj);
            } else {
                console.log(controlMode[currentMode]);
            }
            // Dynagraph Card Settings
            await cy.get('input[formcontrolname="fillBaseRatio"]').then((e) => changedObj.fillbase = e[0].value);
            await cy.get('input[formcontrolname="fluidDampingCoefficient"]').then((e) => changedObj.dampingFactor = e[0].value);
            await cy.get('input[formcontrolname="fluidFrictionRatio"]').then((e) => changedObj.mechanicalFriction = e[0].value);
        }

        // Fillage inputs values
        async function fillageMode(changedObj) {
            await cy.get('input[formcontrolname="threshold"]').eq(0).then((e) => changedObj.fillageSetPoint = e[0].value);
            await cy.get('input[formcontrolname="thresholdTicks"]').then((e) => changedObj.pumpOffStrokesAllowed = e[0].value);
            await cy.get('input[formcontrolname="minFillageStartupStrokesCount"]').then((e) => changedObj.startUpStrokes = e[0].value);
            await cy.get('[formgroupname="vfdUse"] .mat-slide-toggle-input')
                .invoke('val', 'aria-checked')
                .then(async (e) => {
                    if (e[0].checked) {
                        await cy.get('input[formcontrolname="threshold"]').eq(1).then((e) => changedObj.secondaryFillageSetPoint = e[0].value);
                    }
                })
        }

        async function pipMode(changedObj) {
            await cy.get('input[formcontrolname="threshold"]').eq(0).then((e) => changedObj.pipSetPoint = e[0].value);
            await cy.get('input[formcontrolname="thresholdTicks"]').then((e) => changedObj.pumpOffStrokesAllowed = e[0].value);
            await cy.get('input[formcontrolname="minPIPStartupStrokesCount"]').then((e) => changedObj.startUpStrokes = e[0].value);
            await cy.get('[formgroupname="vfdUse"] .mat-slide-toggle-input')
                .invoke('val', 'aria-checked')
                .then(async (e) => {
                    if (e[0].checked) {
                        await cy.get('input[formcontrolname="threshold"]').eq(1).then((e) => changedObj.secondaryPIPSetPoint = e[0].value);
                    }
                })
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
