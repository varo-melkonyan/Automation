describe('GreenShot Configuration', () => {
    const validLogin = "varazdat.gm@ovaktechnologies.com";    //valid login
    const validPassword = "Aa1234$#@!";                       //valid password
    const wellName = "Test1234";                         //Well name

    let firstChange = {};
    let secondChange = {};

    it('POC config parameters', () => {
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
            cy.get('.sis-tabs__item').contains('System Parameters').click();
            cy.url().then((e) => {
                const lastIndexOfSpace = e.lastIndexOf('/');
                cy.visit(e.substring(0, lastIndexOfSpace) + '/developer')
            })
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
                let allValues = Object.values(data[0][0].wellSettings);
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
            // Gas, Oil And Environment Parameters
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
