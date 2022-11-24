describe('Control setup', () => {
    const validLogin = "varazdat.gm@ovaktechnologies.com";    //valid login
    const validPassword = "Aa1234$#@!";                       //valid password
    const wellName = "Test123";                         //Well name
    const controlMode = ["Fillage", "PIP", "Timer, On/Off", "Host"];
    let currentMode = 0;

    let firstChange = {};
    let secondChange = {};

    it('Save control setup parameters', () => {
        let data = [];
        // get data
        cy.fixture('../e2e/Save parameters/Control setup/assets/data_CS')
            .then(async (e) => {
                data.push(e);
            });

        // test commands
        function commands() {
            cy.get('.well-list__group').contains(wellName).click();
            cy.wait(1000);
            cy.get('button[class=mat-button-toggle-button]').contains('Well Manager').click();
            cy.get('.sis-tabs__item').contains('Control Setup').click();
            controlSetupCommands();
        }

        async function controlSetupCommands() {
            cy.get('body').then(async () => {
                // ControlMode
                await cy.get('.mat-select').eq(0).click();
                await cy.get('.mat-option-text').contains(controlMode[currentMode]).click();
                await changeValues(0);
                await cy.wait(2000);
                await changeValues(1);
            });
        }


        //change parameters
        async function changeValues(range) {
            await cy.get('.mat-input-element').then(() => {
                let valuesFillage = Object.values(data[0][0].fillage);
                let valuesPip = Object.values(data[0][0].pip);
                let valuesDynagraph = Object.values(data[0][1].dynagraph);
                let valuesVfd = Object.values(data[0][2].vfd);
                let valuesVfdSpeedZone = Object.values(data[0][3].vfdSpeedZone);

                if (controlMode[currentMode] === "Fillage") {
                    console.log(controlMode[currentMode]);
                    cy.get('.mat-select').eq(1).click().type('1').type('{enter}');
                    cy.get('.mat-select').eq(2).click().type('01').type('{enter}');
                    cy.get('[formgroupname="vfdUse"] .mat-slide-toggle-input')
                        .invoke('val', 'aria-checked')
                        .then((e) => {
                            if (e[0].checked) {
                                cy.get('[formgroupname="zoneControl"] .mat-checkbox-input')
                                    .invoke('val', 'aria-checked')
                                    .then(async (e) => {
                                        if (e[0].checked) {
                                            cy.get('[formgroupname="zoneControl"] .mat-checkbox-layout').click();
                                        }
                                    });
                                cy.get('[formgroupname="vfdUse"] .mat-slide-toggle-label').click();
                            }
                        });
                    cy.get('[formgroupname="vfdUse"] .mat-slide-toggle-input')
                        .invoke('val', 'aria-checked')
                        .then((e) => {
                            if (e[0].checked) {
                                for (let i = 0; i < valuesFillage.length; i++) {
                                    cy.get('.mat-input-element').eq(i)
                                        .clear().type(valuesFillage[i][range]);
                                }
                                for (let j = 0; j < valuesDynagraph.length; j++) {
                                    cy.get('.mat-input-element').eq(valuesFillage.length + j)
                                        .clear().type(valuesDynagraph[j][range]);
                                }
                                for (let k = 0; k < valuesVfd.length; k++) {
                                    cy.get('.mat-input-element').eq(valuesDynagraph.length + valuesFillage.length + k)
                                        .clear().type(valuesVfd[k][range]);
                                }
                                cy.get('[formgroupname="zoneControl"] .mat-checkbox-input')
                                    .invoke('val', 'aria-checked')
                                    .then(async (e) => {
                                        if (e[0].checked) {
                                            valuesVfdSpeedZone = Object.values(valuesVfdSpeedZone[0]);
                                            for (let q = 0; q < valuesVfdSpeedZone.length; q++) {
                                                cy.get('.mat-input-element')
                                                    .eq(valuesFillage.length + valuesDynagraph.length + valuesVfd.length + q)
                                                    .clear().type(valuesVfdSpeedZone[q][range]);
                                            }
                                        }
                                    })
                            } else {
                                for (let i = 0; i < valuesFillage.length - 1; i++) {
                                    cy.get('.mat-input-element').eq(i).clear().type(valuesFillage[i][range]);
                                }
                                for (let j = 0; j < valuesDynagraph.length; j++) {
                                    cy.get('.mat-input-element').eq(valuesFillage.length - 1 + j).clear().type(valuesDynagraph[j][range]);
                                }
                            }
                        });
                } else if (controlMode[currentMode] === "PIP") {
                    console.log(controlMode[currentMode]);
                    cy.get('.mat-select').eq(1).click().type('1').type('{enter}');
                    cy.get('.mat-select').eq(2).click().type('01').type('{enter}');
                    cy.get('[formgroupname="vfdUse"] .mat-slide-toggle-input')
                        .invoke('val', 'aria-checked')
                        .then((e) => {
                            if (!e[0].checked) {
                                cy.get('[formgroupname="vfdUse"] .mat-slide-toggle-label').click();
                                cy.get('[formgroupname="zoneControl"] .mat-checkbox-input')
                                    .invoke('val', 'aria-checked')
                                    .then(async (e) => {
                                        if (e[0].checked) {
                                            cy.get('[formgroupname="zoneControl"] .mat-checkbox-layout').click();
                                        }
                                    });
                            } else {
                                cy.get('[formgroupname="zoneControl"] .mat-checkbox-input')
                                    .invoke('val', 'aria-checked')
                                    .then(async (e) => {
                                        if (e[0].checked) {
                                            cy.get('[formgroupname="zoneControl"] .mat-checkbox-layout').click();
                                        }
                                    });
                            }
                        });
                    cy.get('[formgroupname="vfdUse"] .mat-slide-toggle-input')
                        .invoke('val', 'aria-checked')
                        .then((e) => {
                            if (e[0].checked) {
                                for (let i = 0; i < valuesPip.length; i++) {
                                    cy.get('.mat-input-element').eq(i)
                                        .clear().type(valuesPip[i][range]);
                                }
                                for (let j = 0; j < valuesDynagraph.length; j++) {
                                    cy.get('.mat-input-element').eq(valuesPip.length + j)
                                        .clear().type(valuesDynagraph[j][range]);
                                }
                                for (let k = 0; k < valuesVfd.length; k++) {
                                    cy.get('.mat-input-element').eq(valuesDynagraph.length + valuesPip.length + k)
                                        .clear().type(valuesVfd[k][range]);
                                }
                                cy.get('[formgroupname="zoneControl"] .mat-checkbox-input')
                                    .invoke('val', 'aria-checked')
                                    .then(async (e) => {
                                        if (e[0].checked) {
                                            valuesVfdSpeedZone = Object.values(valuesVfdSpeedZone[0]);
                                            for (let q = 0; q < valuesVfdSpeedZone.length; q++) {
                                                cy.get('.mat-input-element')
                                                    .eq(valuesPip.length + valuesDynagraph.length + valuesVfd.length + q)
                                                    .clear().type(valuesVfdSpeedZone[q][range]);
                                            }
                                        }
                                    })
                            } else {
                                for (let i = 0; i < valuesPip.length - 1; i++) {
                                    cy.get('.mat-input-element').eq(i).clear().type(valuesPip[i][range]);
                                }
                                for (let j = 0; j < valuesDynagraph.length; j++) {
                                    cy.get('.mat-input-element').eq(valuesPip.length - 1 + j).clear().type(valuesDynagraph[j][range]);
                                }
                            }
                        });
                } else if (controlMode[currentMode] === "Timer, On/Off") {
                    cy.get('[formgroupname="zoneControl"] .mat-checkbox-input').invoke('val', 'aria-checked').then(async (e) => {
                        if (!e[0].checked) {
                            cy.get('[formgroupname="zoneControl"] .mat-checkbox-layout').click();
                        }
                    });
                    cy.get('[formgroupname="zoneControl"] .mat-checkbox-input').invoke('val', 'aria-checked').then(async (e) => {
                        if (e[0].checked) {
                            console.log(controlMode[currentMode]);
                            cy.get('.mat-select').eq(1).click().type('1').type('{enter}');
                            cy.get('.mat-select').eq(2).click().type('01').type('{enter}');
                            //Off time
                            cy.get('.mat-select').eq(3).click().type('1').type('{enter}');
                            cy.get('.mat-select').eq(4).click().type('01').type('{enter}');

                            cy.get('[formgroupname="vfdUse"] .mat-slide-toggle-input')
                                .invoke('val', 'aria-checked')
                                .then((e) => {
                                    if (e[0].checked) {
                                        for (let j = 0; j < valuesDynagraph.length; j++) {
                                            cy.get('.mat-input-element').eq(j)
                                                .clear().type(valuesDynagraph[j][range]);
                                        }
                                        for (let k = 0; k < valuesVfd.length; k++) {
                                            cy.get('.mat-input-element').eq(valuesDynagraph.length + k)
                                                .clear().type(valuesVfd[k][range]);
                                        }
                                        cy.get('[formgroupname="zoneControl"] .mat-checkbox-input')
                                            .invoke('val', 'aria-checked')
                                            .then(async (e) => {
                                                if (e[0].checked) {
                                                    valuesVfdSpeedZone = Object.values(valuesVfdSpeedZone[0]);
                                                    for (let q = 0; q < valuesVfdSpeedZone.length; q++) {
                                                        cy.get('.mat-input-element')
                                                            .eq(valuesDynagraph.length + valuesVfd.length + q)
                                                            .clear().type(valuesVfdSpeedZone[q][range]);
                                                    }
                                                }
                                            })
                                    } else {
                                        for (let j = 0; j < valuesDynagraph.length; j++) {
                                            cy.get('.mat-input-element').eq(j).clear().type(valuesDynagraph[j][range]);
                                        }
                                    }
                                });
                        }
                    });

                } else {
                    console.log("Host Mode");
                    cy.get('[formgroupname="vfdUse"] .mat-slide-toggle-input')
                        .invoke('val', 'aria-checked')
                        .then((e) => {
                            if (e[0].checked) {
                                for (let j = 0; j < valuesDynagraph.length; j++) {
                                    cy.get('.mat-input-element').eq(j)
                                        .clear().type(valuesDynagraph[j][range]);
                                }
                                for (let k = 0; k < valuesVfd.length; k++) {
                                    cy.get('.mat-input-element').eq(valuesDynagraph.length + k)
                                        .clear().type(valuesVfd[k][range]);
                                }
                                cy.get('[formgroupname="zoneControl"] .mat-checkbox-input')
                                    .invoke('val', 'aria-checked')
                                    .then(async (e) => {
                                        if (e[0].checked) {
                                            cy.get('.mat-select').eq(1).click();
                                            cy.get('.mat-option-text').contains("in").click();
                                            cy.get('.mat-select').eq(2).click();
                                            cy.get('.mat-option-text').contains("Hz").click();
                                            valuesVfdSpeedZone = Object.values(valuesVfdSpeedZone[1]);
                                            for (let q = 0; q < valuesVfdSpeedZone.length; q++) {
                                                cy.get('.mat-input-element')
                                                    .eq(valuesDynagraph.length + valuesVfd.length + q)
                                                    .clear().type(valuesVfdSpeedZone[q][range]);
                                            }
                                        }
                                    })
                            } else {
                                for (let j = 0; j < valuesDynagraph.length; j++) {
                                    cy.get('.mat-input-element').eq(j).clear().type(valuesDynagraph[j][range]);
                                }
                            }
                        });
                }
            });
            cy.get('#saveControl').click();
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
                await controlSetupCommands();
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
