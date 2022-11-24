describe('POC Configuration', () => {
    const validLogin = "varazdat.gm@ovaktechnologies.com";    //valid login
    const validPassword = "Aa1234$#@!";                       //valid password
    const wellName = "Test123";                         //Well name
    const configMode = ["Greenshot", "Well Manager"];
    let currentMode = 0;

    let firstChange = {};
    let secondChange = {};

    it('POC config parameters', () => {
        let data = [];
        // get data
        cy.fixture('../e2e/Save parameters/POC Config/assets/data_Well_config')
            .then(async (e) => {
                data.push(e);
            });

        // test commands
        function commands() {
            cy.get('.well-list__group').contains(wellName).click();
            cy.wait(1000);
            cy.get('button[class=mat-button-toggle-button]').contains('Well Manager').click();
            cy.get('.sis-tabs__item').contains('Configuration').click();
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
                let allValues = Object.values(data[0][0].POC_Settings);

                cy.get('.mat-slide-toggle-input')
                    .invoke('val', 'aria-checked')
                    .then((e) => {
                        if (!e[0].checked) {
                            cy.get('.mat-slide-toggle-label').click();
                        }
                    });
                cy.get('.mat-slide-toggle-input')
                    .invoke('val', 'aria-checked')
                    .then((e) => {
                        if (e[0].checked) {
                            //withoutpassword
                            for (let i = 0; i < allValues.length; i++) {
                                if (i === 3) {
                                    continue;
                                }
                                cy.get('.mat-input-element').eq(i)
                                    .clear({force: true}).type(allValues[i][range], {force: true});
                            }
                        }
                    });
            });
            cy.get('#saveConfig').click();
            cy.wait(3000);
            await changeOPMode(range);
        }

        async function changeOPMode(range) {
            if (currentMode === 0) {
                await cy.get('.expand-collapse__label').click();
                await cy.get('.mat-radio-label').eq(0).click({force: true});
                await cy.get('.mat-raised-button').click();
                await cy.reload();
                await cy.get('.sis-tabs__item').contains('System Parameters').click();
                await cy.get('.expand-collapse__label').click();
                await cy.get('.mat-radio-outer-circle').eq(2).click({force: true});
                cy.pause()
                await cy.get('#saveSysParam').click();
                await cy.reload();
                await cy.get('button[class=mat-button-toggle-button]').contains('Well Manager').click();
                await cy.get('.sis-tabs__item').contains('Configuration').click();
                await cy.get('.expand-collapse__label').click();
            } else if (currentMode === 1) {
                console.log("true")
                await cy.get('.expand-collapse__label').click();
                await cy.get('.mat-radio-label').eq(1).click({force: true});
                await cy.get('.mat-raised-button').click();
                await cy.reload();
                await cy.get('.expand-collapse__label').click();
                await cy.get('.mat-radio-outer-circle').eq(2).click({force: true});
                await cy.get('.mat-raised-button').click();
                await cy.reload();
                await cy.get('button[class=mat-button-toggle-button]').contains('Well Manager').click();
                await cy.get('.sis-tabs__item').contains('Configuration').click();
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
            // Surface Equipment
            await cy.get('input[formcontrolname="canonicalStrokeLength"]').then((e) => changedObj.canonicalStrokeLength = e[0].value);
            await cy.get('input[formcontrolname="stuffingBoxFriction"]').then((e) => changedObj.stuffingBoxFriction = e[0].value);
            await cy.get('input[formcontrolname="topLoad"]').then((e) => changedObj.topLoad = e[0].value);
            // Fluid, Gas and Environmental Properties
            await cy.get('input[formcontrolname="oilApiGravity"]').then((e) => changedObj.oilApiGravity = e[0].value);
            await cy.get('.mat-checkbox-input').eq(0).invoke('val', 'aria-checked').then(async (e) => {
                if (!e[0].checked) {
                    await cy.get('input[formcontrolname="fluidBubblingGor"]').then((e) => changedObj.fluidBubblingGor = e[0].value);
                } else {
                    await cy.get('.mat-checkbox-input').eq(0).check({force: true});
                    await cy.get('input[formcontrolname="fluidBubblingGor"]').then((e) => changedObj.fluidBubblingGor = e[0].value);
                }
            });
            await cy.get('input[formcontrolname="waterSpecificGravity"]').then((e) => changedObj.waterSpecificGravity = e[0].value);
            await cy.get('.mat-checkbox-input').eq(1).invoke('val', 'aria-checked').then(async (e) => {
                if (!e[0].checked) {
                    await cy.get('input[formcontrolname="fluidBubblingPressure"]').then((e) => changedObj.fluidBubblingPressure = e[0].value);
                } else {
                    await cy.get('.mat-checkbox-input').eq(1).check({force: true});
                    await cy.get('input[formcontrolname="fluidBubblingPressure"]').then((e) => changedObj.fluidBubblingPressure = e[0].value);
                }
            });
            await cy.get('input[formcontrolname="sfWaterCut"]').then((e) => changedObj.sfWaterCut = e[0].value);
            await cy.get('.mat-checkbox-input').eq(2).invoke('val', 'aria-checked').then(async (e) => {
                if (!e[0].checked) {
                    await cy.get('input[formcontrolname="oilFormationFactor"]').then((e) => changedObj.oilFormationFactor = e[0].value);
                } else {
                    await cy.get('.mat-checkbox-input').eq(2).check({force: true});
                    await cy.get('input[formcontrolname="oilFormationFactor"]').then((e) => changedObj.oilFormationFactor = e[0].value);
                }
            });

            await cy.get('input[formcontrolname="fluidViscosity"]').then((e) => changedObj.fluidViscosity = e[0].value);
            await cy.get('.mat-checkbox-input').eq(3).invoke('val', 'aria-checked').then(async (e) => {
                if (!e[0].checked) {
                    await cy.get('input[formcontrolname="fluidPressureGradient"]').then((e) => changedObj.fluidPressureGradient = e[0].value);
                } else {
                    await cy.get('.mat-checkbox-input').eq(3).check({force: true});
                    await cy.get('input[formcontrolname="fluidPressureGradient"]').then((e) => changedObj.fluidPressureGradient = e[0].value);
                }
            });
            await cy.get('input[formcontrolname="sfGasPressure"]').then((e) => changedObj.sfGasPressure = e[0].value);
            await cy.get('input[formcontrolname="sfFluidPressure"]').then((e) => changedObj.sfFluidPressure = e[0].value);
            await cy.get('input[formcontrolname="sfTemperature"]').then((e) => changedObj.sfTemperature = e[0].value);
            await cy.get('input[formcontrolname="gasSpecificGravity"]').then((e) => changedObj.gasSpecificGravity = e[0].value);
            await cy.get('input[formcontrolname="atmosphericPressure"]').then((e) => changedObj.atmosphericPressure = e[0].value);
            await cy.get('input[formcontrolname="atmosphericPressure"]').then((e) => changedObj.atmosphericPressure = e[0].value);
            //Rods
            await cy.get('input[formcontrolname="serviceFactor"]').then((e) => changedObj.serviceFactor = e[0].value);
            //Tubing
            await cy.get('.mat-checkbox-input').eq(4).invoke('val', 'aria-checked').then(async (e) => {
                if (!e[0].checked) {
                    await cy.get('input[formcontrolname="tubingAnchorDepth"]').then((e) => changedObj.tubingAnchorDepth = e[0].value);
                } else {
                    await cy.get('.mat-checkbox-input').eq(4).check();
                    await cy.get('input[formcontrolname="tubingAnchorDepth"]').then((e) => changedObj.tubingAnchorDepth = e[0].value);
                }
            });
            //Bottom Hole Assembly (BHA)
            await cy.get('input[formcontrolname="distance"]').then((e) => changedObj.distance = e[0].value);
            await cy.get('input[formcontrolname="depth"]').then((e) => changedObj.depth = e[0].value);
            await cy.get('input[formcontrolname="diameter"]').then((e) => changedObj.diameter = e[0].value);
            await cy.get('input[formcontrolname="clearance"]').then((e) => changedObj.clearance = e[0].value);
            await cy.get('input[formcontrolname="length"]').then((e) => changedObj.length = e[0].value);
            //VFD
            await cy.get('.mat-slide-toggle-input').invoke('val', 'aria-checked').then(async (e) => {
                if (!e[0].checked) {
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
                }
                else {
                    await cy.get('.mat-slide-toggle-input').check();
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
            console.log(firstChange);
            console.log(secondChange);
            for (let i = 0; i < Object.values(firstChange).length; i++) {
                if (Object.values(firstChange)[i] === Object.values(secondChange)[i]) {
                    console.log(Object.values(firstChange));
                    console.log(Object.values(secondChange));
                    console.log(Object.values(secondChange)[i]);
                    console.log(i)
                    cy.pause();
                }
            }

            if (currentMode < configMode.length - 1) {
                firstChange = {};
                secondChange = {};
                currentMode += 1;
                await configurationCommands();
            } else {
                alert("Finish")
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
