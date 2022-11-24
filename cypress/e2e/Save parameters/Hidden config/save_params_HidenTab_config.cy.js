describe('POC Configuration', () => {
    const validLogin = "varazdat.gm@ovaktechnologies.com";    //valid login
    const validPassword = "Aa1234$#@!";                       //valid password
    const wellName = "Test123";                         //Well name
    const configMode = ["Greenshot", "Well Manager", "Greenshot and Well Manager"];
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
                // await valuesInputs();
                await changeValues(0);
                // await cy.wait(2000);
                // await changeValues(1);
            });
        }


        //change parameters
        async function changeValues(range) {
            await cy.get('.mat-input-element').then(() => {
                let allValues = Object.values(data[0][0].POC_Settings);

                if (configMode[currentMode] === "Greenshot") {
                    console.log(configMode[currentMode]);
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
                                for (let i = 0; i < 3; i++) {
                                    cy.get('.mat-input-element').eq(i)
                                        .clear().type(allValues[i][range]);
                                }
                                for (let i = 4; i < 21; i++) {
                                    cy.get('.mat-input-element').eq(i)
                                        .clear().type(allValues[i][range]);
                                }
                                for (let i = 25; i < allValues.length; i++) {
                                    cy.get('.mat-input-element').eq(i)
                                        .clear().type(allValues[i][range]);
                                }

                            }
                        });
                }
            });
            cy.get('#saveControl').click();
            cy.wait(3000);
            cy.reload();
            // cy.get('.mat-radio-checked').contains('GreenShot or Well manager');
            cy.get('.mat-input-element').then(async () => {
                if (range === 0) {
                    await getValues(range, firstChange);
                } else if (range === 1) {
                    await getValues(range, secondChange);
                    await changeValues();
                }
            });
        }

        async function valuesInputs(changedObj) {
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
                }
            });
            await cy.get('input[formcontrolname="waterSpecificGravity"]').then((e) => changedObj.waterSpecificGravity = e[0].value);
            await cy.get('.mat-checkbox-input').eq(1).invoke('val', 'aria-checked').then(async (e) => {
                if (!e[0].checked) {
                    await cy.get('input[formcontrolname="fluidBubblingPressure"]').then((e) => changedObj.fluidBubblingPressure = e[0].value);
                }
            });
            await cy.get('input[formcontrolname="sfWaterCut"]').then((e) => changedObj.sfWaterCut = e[0].value);
            await cy.get('.mat-checkbox-input').eq(2).invoke('val', 'aria-checked').then(async (e) => {
                if (!e[0].checked) {
                    await cy.get('input[formcontrolname="oilFormationFactor"]').then((e) => changedObj.oilFormationFactor = e[0].value);
                }
            });

            await cy.get('input[formcontrolname="fluidViscosity"]').then((e) => changedObj.fluidViscosity = e[0].value);
            await cy.get('.mat-checkbox-input').eq(3).invoke('val', 'aria-checked').then(async (e) => {
                if (!e[0].checked) {
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
            });
        }

        //check values
        async function checkValues() {
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
