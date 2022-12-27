describe('POC Hidden Configuration', () => {
    const validLogin = "varazdat.gm@ovaktechnologies.com";    //valid login
    const validPassword = "Aa1234$#@!";                       //valid password
    const wellName = "Test1234";                         //Well name

    let firstChange = {};
    let secondChange = {};

    it('Hidden parameters', () => {
        let data = [];
        // get data
        cy.fixture('../e2e/Save parameters/Hidden config POC/assets/data_devTab_config')
            .then(async (e) => {
                data.push(e);
            });

        // test commands
        function commands() {
            cy.get('.well-list__group').contains(wellName).click();
            cy.wait(1000);
            cy.get('button[class=mat-button-toggle-button]').contains('Well Manager').click();
            cy.url().then((e) => {
                const lastIndexOfSpace = e.lastIndexOf('/');
                cy.visit(e.substring(0, lastIndexOfSpace) + '/developer');
            });
            configurationCommands();
        }

        async function configurationCommands() {
            cy.get('body').then(async () => {
                // configMode
                await changeValues(0);
                await cy.wait(2000);
                await changeValues(1);
            });
        }


        //change parameters
        async function changeValues(range) {
            await cy.get('.expand-collapse__button').click();
            await cy.wait(2000);
            await cy.get('.mat-input-element').then(() => {
                let allValues = Object.values(data[0][0].wellSettings);
                for (let i = 0; i < allValues.length; i++) {
                    cy.get('.mat-input-element').eq(i)
                        .clear({force: true}).type(allValues[i][range], {force: true});
                }
            });
            cy.get('#saveParams').click();
            cy.wait(3000);
            cy.reload();
            cy.wait(3000);
            await changeRange(range);
        }

        async function changeRange(range) {
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
            // Algorithms Settings
            await cy.get('input[formcontrolname="cellularModeChannelAddress"]').then((e) => changedObj.cellularModeChannelAddress = e[0].value);
            await cy.get('input[formcontrolname="cellularRssiChannelAddress"]').then((e) => changedObj.cellularRssiChannelAddress = e[0].value);
            await cy.get('input[formcontrolname="cellularSinrChannelAddress"]').then((e) => changedObj.cellularSinrChannelAddress = e[0].value);
            //POC
            //Algorithm Settings
            await cy.get('input[formcontrolname="pdpCalculationAccuracy"]').then((e) => changedObj.pdpCalculationAccuracy = e[0].value);
            await cy.get('input[formcontrolname="pdpCalculationStepsMax"]').then((e) => changedObj.pdpCalculationStepsMax = e[0].value);
            await cy.get('input[formcontrolname="dimA"]').then((e) => changedObj.dimA = e[0].value);
            await cy.get('input[formcontrolname="posnOffset"]').then((e) => changedObj.posnOffset = e[0].value);
            await cy.get('input[formcontrolname="posnPeekThresholdRate"]').then((e) => changedObj.posnPeekThresholdRate = e[0].value);
            await cy.get('input[formcontrolname="posnPeekSmoothingWindowSize"]').then((e) => changedObj.posnPeekSmoothingWindowSize = e[0].value);
            await cy.get('input[formcontrolname="strokeMaxDuration"]').then((e) => changedObj.strokeMaxDuration = e[0].value);
            await cy.get('input[formcontrolname="dhSize"]').then((e) => changedObj.dhSize = e[0].value);
            await cy.get('input[formcontrolname="sf2dhFourierCoefficientsCount"]').then((e) => changedObj.sf2dhFourierCoefficientsCount = e[0].value);
            await cy.get('input[formcontrolname="stressVelocityAdjustmentCoefficient"]').then((e) => changedObj.stressVelocityAdjustmentCoefficient = e[0].value);
            await cy.get('input[formcontrolname="strokeMinLengthRate"]').then((e) => changedObj.strokeMinLengthRate = e[0].value);
            //Physical Parameters
            await cy.get('input[formcontrolname="strokeEndCrankTicksCount"]').then((e) => changedObj.strokeEndCrankTicksCount = e[0].value);
            //Other Settings
            await cy.get('input[formcontrolname="markedStrokeAdjacencyCount"]').then((e) => changedObj.markedStrokeAdjacencyCount = e[0].value);
            await cy.get('input[formcontrolname="markedStrokeStandardPeriod"]').then((e) => changedObj.markedStrokeStandardPeriod = e[0].value);
            //Startup Buzzer/LED
            await cy.get('input[formcontrolname="buzzingDuration"]').then((e) => changedObj.buzzingDuration = e[0].value);
            await cy.get('input[formcontrolname="startingTimeout"]').then((e) => changedObj.startingTimeout = e[0].value);
            await cy.get('input[formcontrolname="stoppingTimeout"]').then((e) => changedObj.stoppingTimeout = e[0].value);
            //VFD
            await cy.get('input[formcontrolname="vfdMotorCurrentAddress"]').then((e) => changedObj.vfdMotorCurrentAddress = e[0].value);
            await cy.get('input[formcontrolname="vfdMotorVoltageAddress"]').then((e) => changedObj.vfdMotorVoltageAddress = e[0].value);
            await cy.get('input[formcontrolname="vfdMotorTorqueAddress"]').then((e) => changedObj.vfdMotorTorqueAddress = e[0].value);
            await cy.get('input[formcontrolname="vfdOutFrequencyAddress"]').then((e) => changedObj.vfdOutFrequencyAddress = e[0].value);
            await cy.get('input[formcontrolname="vfdDCBusVoltageAddress"]').then((e) => changedObj.vfdDCBusVoltageAddress = e[0].value);
            await cy.get('input[formcontrolname="vfdAmbientTemperatureAddress"]').then((e) => changedObj.vfdAmbientTemperatureAddress = e[0].value);
            //Inclinometer & LoadCell & Crank
            await cy.get('input[formcontrolname="inclinometerSockety1"]').then((e) => changedObj.inclinometerSockety1 = e[0].value);
            await cy.get('input[formcontrolname="inclinometerSockety2"]').then((e) => changedObj.inclinometerSockety2 = e[0].value);
            await cy.get('input[formcontrolname="loadCellSockety1"]').then((e) => changedObj.loadCellSockety1 = e[0].value);
            await cy.get('input[formcontrolname="loadCellSockety2"]').then((e) => changedObj.loadCellSockety2 = e[0].value);


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

            cy.log("Finish");
            console.log("Finish");
            alert("Finish");
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
