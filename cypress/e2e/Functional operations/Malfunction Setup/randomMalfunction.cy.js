const { func } = require("assert-plus");

describe('Custom Malfunction', () => {
    const validLogin = "varazdat.gm@ovaktechnologies.com";    //valid login
    const validPassword = "Aa1234$#@!";                       //valid password
    const wellName = "New Well 135";                         //Well name

    let customMalf = 0;

    it('Check the work of Custom Malfunction', () => {
        // test commands
        function commands() {
            cy.get('.well-list__group').contains(wellName).click();
            cy.wait(1000);
            cy.get('button[class=mat-button-toggle-button]').contains('Well Manager').click();
            onOffModbusUnit(0);
            checkMalItem(0);
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

            await cy.wait(2000);

            //add VFD Speed Channel
            await cy.get('.sys-accordion__header').eq(1).contains(' + Add New ').click();
            await cy.get('.mat-select').eq(0).click().get('.mat-option').contains("VFD Speed").click();
            await cy.get('.mat-select').eq(1).click().get('.mat-option').contains("Module SYNC 1").click();
            await cy.get('.mat-select').eq(2).click().get('.mat-option').contains("AO 01").click();
            await cy.get('.mat-select').eq(3).click().get('.mat-option').contains("0-10V").click();
            await cy.get('.mat-select').eq(4).click().get('.mat-option').contains("Hz").click();
            await cy.get('input[formcontrolname="y1"]').clear().type(0);
            await cy.get('input[formcontrolname="y2"]').clear().type(60);
            await cy.get('.io-add-malf').click();
            await cy.get('.mat-checkbox-input').eq(1).check({force: true});
            await cy.get('.mat-select').eq(5).click().get('.mat-option').contains("Min").click();
            await cy.get('input[formcontrolname="value"]').clear().type(20);
            await cy.get('input[formcontrolname="thresholdDuration"]').clear().type(2);
            await cy.get('input[formcontrolname="malfunctionLimit"]').clear().type(4);
            await cy.get('.mat-input-element').eq(6).clear().type(1);
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
            await checkMalItem(1);
        }
        
        async function checkMalItem(custom) {
            customMalf = custom;
            await cy.get('.mat-checkbox-input').click({force: true, multiple: true});
            await cy.get('#saveMalf').click();
            await cy.wait(3000);

            await cy.get('.malf-label').eq(0).as('maxMalf');
            await cy.get('.malf-label').eq(1).as('minMalf');
            await cy.get('.malf-label').eq(2).as('pointMalf');
            await cy.get('.malf-label').eq(5).as('lowFluidMalf');

            if(custom === 1) {
                await cy.get('.malf-label').eq(6).as('vfdSpeed');
                await cy.get('.malf-label').eq(7).as('anMalf');
                await cy.get('.malf-label').eq(8).as('diMalf');
            }

            cy.wait(8000);

            await cy.get("@maxMalf").then(async (e) => {
                if(e.css('color') === 'rgb(238, 88, 53)') {
                    await cy.get('.mat-input-element').eq(2).then(async (retries) => {
                        let retriesa = retries[0].value;
                        await cy.get('.mat-input-element').eq(3).then(async (retriesTimeH) => {
                            let retriesTimeHa = retriesTimeH[0].value;
                            await cy.get('.mat-input-element').eq(4).then(async (retriesTimeMin) => {
                                let retriesTimeMina = retriesTimeMin[0].value;
                                await cy.get('.malf-current-retries').eq(0).then(async (currentRetries) => {
                                    let currentRetriesa = currentRetries[0].value;
                                    await console.log(retries[0].value);
                                    await checkMalfunction(retriesa, retriesTimeHa, retriesTimeMina, currentRetriesa, 0);
                                });
                            });
                        });
                    });
                }
            })

            await cy.get("@minMalf").then(async (e) => {
                if(e.css('color') === 'rgb(238, 88, 53)') {
                    await cy.get('.mat-input-element').eq(7).then(async (retries) => {
                        let retriesa = retries[0].value;
                        await cy.get('.mat-input-element').eq(8).then(async (retriesTimeH) => {
                            let retriesTimeHa = retriesTimeH[0].value;
                            await cy.get('.mat-input-element').eq(9).then(async (retriesTimeMin) => {
                                let retriesTimeMina = retriesTimeMin[0].value;
                                await cy.get('.malf-current-retries').eq(1).then(async (currentRetries) => {
                                    let currentRetriesa = currentRetries[0].value;
                                    await checkMalfunction(retriesa, retriesTimeHa, retriesTimeMina, currentRetriesa, 1);
                                });
                            });
                        });
                    });
                }
            });

            await cy.get("@pointMalf").then(async (e) => {
                if(e.css('color') === 'rgb(238, 88, 53)') {
                    await cy.get('.mat-input-element').eq(13).then(async (retries) => {
                        let retriesa = retries[0].value;
                        await cy.get('.mat-input-element').eq(14).then(async (retriesTimeH) => {
                            let retriesTimeHa = retriesTimeH[0].value;
                            await cy.get('.mat-input-element').eq(15).then(async (retriesTimeMin) => {
                                let retriesTimeMina = retriesTimeMin[0].value;
                                await cy.get('.malf-current-retries').eq(2).then(async (currentRetries) => {
                                    let currentRetriesa = currentRetries[0].value;
                                    await checkMalfunction(retriesa, retriesTimeHa, retriesTimeMina, currentRetriesa, 2);
                                });
                            });
                        });
                    });
                }
            });

            await cy.get("@lowFluidMalf").then(async (e) => {
                if(e.css('color') === 'rgb(238, 88, 53)') {
                    await cy.get('.mat-input-element').eq(18).then(async (retries) => {
                        let retriesa = retries[0].value;
                        await cy.get('.mat-input-element').eq(19).then(async (retriesTimeH) => {
                            let retriesTimeHa = retriesTimeH[0].value;
                            await cy.get('.mat-input-element').eq(20).then(async (retriesTimeMin) => {
                                let retriesTimeMina = retriesTimeMin[0].value;
                                await cy.get('.malf-current-retries').eq(3).then(async (currentRetries) => {
                                    let currentRetriesa = currentRetries[0].value;
                                    await checkMalfunction(retriesa, retriesTimeHa, retriesTimeMina, currentRetriesa, 3);
                                });
                            });
                        });
                    });
                }
            });

            if(custom === 1) {
                await cy.get("@vfdSpeed").then(async (e) => {
                    if(e.css('color') === 'rgb(238, 88, 53)') {
                        await cy.get('.mat-input-element').eq(23).then(async (retries) => {
                            let retriesa = retries[0].value;
                            await cy.get('.mat-input-element').eq(24).then(async (retriesTimeH) => {
                                let retriesTimeHa = retriesTimeH[0].value;
                                await cy.get('.mat-input-element').eq(25).then(async (retriesTimeMin) => {
                                    let retriesTimeMina = retriesTimeMin[0].value;
                                    await cy.get('.malf-current-retries').eq(4).then(async (currentRetries) => {
                                        let currentRetriesa = currentRetries[0].value;
                                        await checkMalfunction(retriesa, retriesTimeHa, retriesTimeMina, currentRetriesa, 4);
                                    });
                                });
                            });
                        });
                    }
                });

                await cy.get("@anMalf").then(async (e) => {
                    if(e.css('color') === 'rgb(238, 88, 53)') {
                        await cy.get('.mat-input-element').eq(28).then(async (retries) => {
                            let retriesa = retries[0].value;
                            await cy.get('.mat-input-element').eq(29).then(async (retriesTimeH) => {
                                let retriesTimeHa = retriesTimeH[0].value;
                                await cy.get('.mat-input-element').eq(30).then(async (retriesTimeMin) => {
                                    let retriesTimeMina = retriesTimeMin[0].value;
                                    await cy.get('.malf-current-retries').eq(5).then(async (currentRetries) => {
                                        let currentRetriesa = currentRetries[0].value;
                                        await checkMalfunction(retriesa, retriesTimeHa, retriesTimeMina, currentRetriesa, 5);
                                    });
                                });
                            });
                        });
                    }
                });

                await cy.get("@diMalf").then(async (e) => {
                    if(e.css('color') === 'rgb(238, 88, 53)') {
                        await cy.get('.mat-input-element').eq(33).then(async (retries) => {
                            let retriesa = retries[0].value;
                            await cy.get('.mat-input-element').eq(34).then(async (retriesTimeH) => {
                                let retriesTimeHa = retriesTimeH[0].value;
                                await cy.get('.mat-input-element').eq(35).then(async (retriesTimeMin) => {
                                    let retriesTimeMina = retriesTimeMin[0].value;
                                    await cy.get('.malf-current-retries').eq(6).then(async (currentRetries) => {
                                        let currentRetriesa = currentRetries[0].value;
                                        await checkMalfunction(retriesa, retriesTimeHa, retriesTimeMina, currentRetriesa, 6);
                                    });
                                });
                            });
                        });
                    }
                });
            }
        }

        async function checkMalfunction(retries, retriesTimeH, retriesTimeMin, currentRetries, malfItem) {
            await cy.get(".footer-status__value").eq(4).then(async (e) => {
                if (!e[0].innerText.includes("Violation")) {
                    await cy.get('.footer-status__value').eq(2).as('wellState');
                    await cy.get('.footer-status__value').eq(2).then(async (e) => {
                        if (e[0].innerText !== "Stopped") {
                            await cy.get("@wellState", {timeout: 80000}).should('have.text', "Stopping");
                        }
                    })
                    await cy.get("@wellState", {timeout: 180000}).should('have.text', "Stopped");
                    await cy.get(".footer-status__value").eq(4).should('not.contain', "Violation");
                    await cy.get('.sis-tabs__item').contains('I/O').click();
                    await cy.get('.sys-accordion__title').eq(0).click();
                    await cy.get('.sys-accordion__grid-item--value').eq(0).then((e) => {
                        let oldValue;
                        oldValue = e[0].innerText;
                        cy.wait(5000);
                        if (oldValue >= e[0].innerText) {
                            cy.log(true);
                        } else {
                            cy.pause();
                        }
                    });
                    await cy.get('.sis-tabs__item').contains('Malfunction Setup').click();
                    if (retriesTimeH === "00") {
                        await cy.get(".malf-current-retries", {timeout: parseInt(retriesTimeMin) + 16000}).eq(malfItem).should('not.have.text', "0");
                    }
                    else {
                        await cy.get(".malf-current-retries", {timeout: parseInt(retriesTimeH) * 60000 + parseInt(retriesTimeMin) + 16000}).eq(malfItem).should('not.have.text', "0");
                    }
                    await cy.get('.mat-checkbox-input').click({force: true, multiple: true});
                    await cy.get('#saveMalf').click();
                    await cy.wait(3000);
                    await cy.get('.malfunction-button').click({force: true});
                }
                else if (e[0].innerText.includes("Violation")) {
                    await cy.get('.footer-status__value').eq(2).as('wellState');
                    await cy.get('.footer-status__value').eq(2).then((e) => {
                        if (e[0].innerText !== "Stopped") {
                            cy.get("@wellState", {timeout: 80000}).should('have.text', "Stopping");
                        }
                    })
                    await cy.get("@wellState", {timeout: 1820000}).should('have.text', "Stopped");
                    await cy.get(".footer-status__value").eq(4).should('contain', "Violation");
                    await cy.get('.sis-tabs__item').contains('I/O').click();
                    await cy.get('.sys-accordion__title').eq(0).click();
                    await cy.get('.sys-accordion__grid-item--value').eq(0).then((e) => {
                        let oldValue;
                        oldValue = e[0].innerText;
                        cy.wait(5000);
                        if (oldValue >= e[0].innerText) {
                            cy.log(true);
                        } else {
                            cy.pause();
                        }
                    });
                    await cy.get('.sis-tabs__item').contains('Malfunction Setup').click();
                    await cy.get('.malf-current-retries').eq(malfItem).as('malfRetries');
                    if (retriesTimeH === "00") {
                        await cy.get("@malfRetries", {timeout: parseInt(retriesTimeMin) * 60000 * retries + 16000}).should('have.text', retries);
                    }
                    else {
                        await cy.get("@malfRetries", {timeout: parseInt(retriesTimeH) * 60000 * 60000 + parseInt(retriesTimeMin) * retries + 16000}).should('have.text', retries);
                    }
                    await cy.wait(6000);
                    await cy.get('.footer-status__value').eq(2).then((e) => {
                        if (e[0].innerText !== "Stopped") {
                            cy.get("@wellState", {timeout: 80000}).should('have.text', "Stopping");
                        }
                    })
                    await cy.get("@wellState", {timeout: 1820000}).should('have.text', "Stopped");
                    await cy.get(".footer-status__value").eq(4).should('not.contain', "Violation");
                    await onOffModbusUnit(1);
                    await cy.wait(2000);
                    await cy.get('.mat-checkbox-input').click({force: true, multiple: true});
                    await cy.get('#saveMalf').click();
                    await cy.wait(3000);
                    await cy.get('.malfunction-button').click({force: true});
                }
                else {
                    cy.pause();
                }
                if (customMalf === 0) {
                    await setCustomMalf();
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
            cy.get('.sis-tabs__item').contains('Malfunction Setup').click();
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
