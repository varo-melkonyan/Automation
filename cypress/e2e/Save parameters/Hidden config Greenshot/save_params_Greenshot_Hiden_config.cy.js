describe('GreenShot Hidden Configuration', () => {
    const validLogin = "varazdat.gm@ovaktechnologies.com";    //valid login
    const validPassword = "Aa1234$#@!";                       //valid password
    const wellName = "Test1234";                         //Well name

    let firstChange = {};
    let secondChange = {};

    it('Hidden parameters', () => {
        let data = [];
        // get data
        cy.fixture('../e2e/Save parameters/Hidden config Greenshot/assets/data_devTab_config')
            .then(async (e) => {
                data.push(e);
            });

        // test commands
        function commands() {
            cy.get('.well-list__group').contains(wellName).click();
            cy.wait(1000);
            cy.get('button[class=mat-button-toggle-button]').contains('Greenshot').click();
            cy.url().then((e) => {
                const lastIndexOfSpace = e.lastIndexOf('/');
                cy.visit(e.substring(0, lastIndexOfSpace) + '/developer');
            })
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
            // Cellular Settings
            await cy.get('input[formcontrolname="cellularModeChannelAddress"]').then((e) => changedObj.cellularModeChannelAddress = e[0].value);
            await cy.get('input[formcontrolname="cellularRssiChannelAddress"]').then((e) => changedObj.cellularRssiChannelAddress = e[0].value);
            await cy.get('input[formcontrolname="cellularSinrChannelAddress"]').then((e) => changedObj.cellularSinrChannelAddress = e[0].value);
            //Greenshot
            //Algorithms Tunig Parameters
            await cy.get('input[formcontrolname="badDataThreshold"]').then((e) => changedObj.badDataThreshold = e[0].value);
            await cy.get('input[formcontrolname="badDataPeriod"]').then((e) => changedObj.badDataPeriod = e[0].value);
            await cy.get('input[formcontrolname="gpBuildUpDataOffsetDuration"]').then((e) => changedObj.gpBuildUpDataOffsetDuration = e[0].value);
            await cy.get('input[formcontrolname="flBandpassFilterFirstCutoffFrequency"]').then((e) => changedObj.flBandpassFilterFirstCutoffFrequency = e[0].value);
            await cy.get('input[formcontrolname="flBandpassFilterSecondCutoffFrequency"]').then((e) => changedObj.flBandpassFilterSecondCutoffFrequency = e[0].value);
            await cy.get('input[formcontrolname="flEchoMaskTime"]').then((e) => changedObj.flEchoMaskTime = e[0].value);
            await cy.get('input[formcontrolname="flCriteriaValueCoefficient"]').then((e) => changedObj.flCriteriaValueCoefficient = e[0].value);
            await cy.get('input[formcontrolname="flTimeStartingSearch"]').then((e) => changedObj.flTimeStartingSearch = e[0].value);
            await cy.get('input[formcontrolname="reflectionDetectionSmoothingWindowDuration"]').then((e) => changedObj.reflectionDetectionSmoothingWindowDuration = e[0].value);
            await cy.get('input[formcontrolname="reflectionDetectionLightingMinRatio"]').then((e) => changedObj.reflectionDetectionLightingMinRatio = e[0].value);
            await cy.get('input[formcontrolname="reflectionDetectionLightingRelyOnAmplitude"]').then((e) => changedObj.reflectionDetectionLightingRelyOnAmplitude = e[0].value);
            await cy.get('input[formcontrolname="reflectionDetectionLightingRelyOnProximity"]').then((e) => changedObj.reflectionDetectionLightingRelyOnProximity = e[0].value);
            await cy.get('input[formcontrolname="reflectionDetectionLightingRelyOnArea"]').then((e) => changedObj.reflectionDetectionLightingRelyOnArea = e[0].value);
            //Acoustic Velocity Calculation (AV Shot)
            await cy.get('input[formcontrolname="flBuildupReadyDuration"]').then((e) => changedObj.flBuildupReadyDuration = e[0].value);
            await cy.get('input[formcontrolname="avBuildupReadyDuration"]').then((e) => changedObj.avBuildupReadyDuration = e[0].value);
            await cy.get('input[formcontrolname="flValveShootingDuration"]').then((e) => changedObj.flValveShootingDuration = e[0].value);
            await cy.get('input[formcontrolname="avValveShootingDuration"]').then((e) => changedObj.avValveShootingDuration = e[0].value);
            await cy.get('input[formcontrolname="flTimeBeforeShot"]').then((e) => changedObj.flTimeBeforeShot = e[0].value);
            await cy.get('input[formcontrolname="gpWellRelaxingDuration"]').then((e) => changedObj.gpWellRelaxingDuration = e[0].value);
            await cy.get('input[formcontrolname="flWellRelaxingDuration"]').then((e) => changedObj.flWellRelaxingDuration = e[0].value);
            await cy.get('input[formcontrolname="avWellRelaxingDuration"]').then((e) => changedObj.avWellRelaxingDuration = e[0].value);
            await cy.get('input[formcontrolname="diffPressureReducingDuration"]').then((e) => changedObj.diffPressureReducingDuration = e[0].value);
            //Shot Start Detection
            // cy.get('.mat-select-value').eq(9).click().type('DiffFromMean').type('{enter}');
            await cy.get('input[formcontrolname="windowInterval"]').then((e) => changedObj.windowInterval = e[0].value);
            await cy.get('input[formcontrolname="stdCoefficient"]').then((e) => changedObj.stdCoefficient = e[0].value);
            await cy.get('input[formcontrolname="diffFromMean"]').then((e) => changedObj.diffFromMean = e[0].value);
            await cy.get('input[formcontrolname="minShotStartTime"]').then((e) => changedObj.minShotStartTime = e[0].value);
            await cy.get('input[formcontrolname="maxShotStartTime"]').then((e) => changedObj.maxShotStartTime = e[0].value);
            //Channel settings
            await cy.get('input[formcontrolname="voiceAcquisitionPeriod"]').then((e) => changedObj.voiceAcquisitionPeriod = e[0].value);
            //Acoustic sensor
            await cy.get('input[formcontrolname="echoChannelMap1Map1X1"]').then((e) => changedObj.echoChannelMap1Map1X1 = e[0].value);
            await cy.get('input[formcontrolname="echoChannelMap1Map1X2"]').then((e) => changedObj.echoChannelMap1Map1X2 = e[0].value);

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
