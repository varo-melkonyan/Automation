describe('Channels', () => {
    const validLogin = "varazdat.gm@ovaktechnologies.com";    //valid login
    const validPassword = "Aa1234$#@!";                       //valid password
    const wellName = "KWM+ 135";                         //Well name

    it('Check the work of add/edit channels', () => {
        // test commands
        function commands() {
            cy.get('.well-list__group').contains(wellName).click();
            cy.wait(1000);
            cy.get('button[class=mat-button-toggle-button]').contains('Well Manager').click();

            onOffModbusUnit(0);
            setChannels();
        }

        async function setChannels() {
            await cy.get('.sis-tabs__item').contains('I/O').click({force: true});
            await cy.wait(7000);
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
            await cy.get('.mat-select').eq(2).click().get('.mat-option').contains("AO 02").click();
            await cy.get('.mat-select').eq(3).click().get('.mat-option').contains("0-20mA").click();
            await cy.get('.mat-select').eq(4).click().get('.mat-option').contains("Hz").click();
            await cy.get('input[formcontrolname="y1"]').clear().type(0);
            await cy.get('input[formcontrolname="y2"]').clear().type(60);
            await cy.get('.mat-flat-button').eq(1).click();

            await cy.wait(2000);

            //add new custom digital
            await cy.get('.sys-accordion__header').eq(2).contains(' + Add New ').click();
            await cy.get('.mat-checkbox-input').check({force: true});
            await cy.get('input[formcontrolname="name"]').clear().type("Custom Digital");
            await cy.get('.mat-select').eq(0).click().get('.mat-option').contains("Module 8DI/8DO").click();
            await cy.get('.mat-select').eq(1).click().get('.mat-option').contains("DO 04").click();
            await cy.get('.mat-flat-button').eq(1).click();

            await cy.wait(2000);

            //add new Buzzer channel digital
            await cy.get('.sys-accordion__header').eq(2).contains(' + Add New ').click();
            await cy.get('.mat-select').eq(0).click().get('.mat-option').contains("Buzzer").click();
            await cy.get('.mat-select').eq(1).click().get('.mat-option').contains("Module 8DI/8DO").click();
            await cy.get('.mat-select').eq(2).click().get('.mat-option').contains("DI 04").click();
            await cy.get('.io-add-malf').click();
            await cy.get('.mat-checkbox-input').eq(1).check({force: true});
            await cy.get('.mat-select').eq(3).click().get('.mat-option').contains("False (opened)").click();
            await cy.get('input[formcontrolname="thresholdDuration"]').clear().type(1);
            await cy.get('input[formcontrolname="malfunctionLimit"]').clear().type(3);
            await cy.get('.mat-input-element').eq(3).clear().type(1);
            await cy.get('.mat-flat-button').eq(1).click();

            await cy.wait(2000);

            await checkAddChannels();
        }

        async function checkAddChannels() {
            await cy.get('.sys-accordion__title').eq(1).click();
            await cy.get('.sys-accordion__title').eq(2).click();
            await cy.wait(2000);

            //check custom analog
            await cy.get('.sys-accordion__grid-item').eq(14).should('be.text', 'Custom Analog');
            await cy.get('.sys-accordion__grid-item').eq(14).contains('Custom Analog').click({force: true});
            await cy.get('input[formcontrolname="name"]').should('have.value', "Custom Analog");
            await cy.get('.mat-select-value-text > span').eq(0).should('contain.text', "Module SYNC 1");
            await cy.get('.mat-select-value-text > span').eq(1).should('contain.text', "AO 01");
            await cy.get('.mat-select-value-text > span').eq(2).should('contain.text', "0-10V");
            await cy.get('.mat-select-value-text > span').eq(3).should('contain.text', "Hz");
            await cy.get('input[formcontrolname="y1"]').should('have.value', 0);
            await cy.get('input[formcontrolname="y2"]').should('have.value', 60);
            await cy.get('.mat-checkbox-input').eq(1).should('be.checked');
            await cy.get('.mat-select-value-text > span').eq(4).should('contain.text', "Min");
            await cy.get('input[formcontrolname="value"]').should('have.value', 20);
            await cy.get('input[formcontrolname="thresholdDuration"]').should('have.value', 2);
            await cy.get('input[formcontrolname="malfunctionLimit"]').should('have.value', 4);
            await cy.get('.mat-input-element').eq(7).should('have.value', "01");
            await cy.get('.mat-flat-button').eq(0).click();

            //check VFD speed channel
            await cy.get('.sys-accordion__grid-item').eq(22).should('be.text', 'VFD Speed');
            await cy.get('.sys-accordion__grid-item').eq(22).contains('VFD Speed').click({force: true});
            await cy.get('.mat-select-value-text > span').eq(0).should('contain.text', "VFD Speed");
            await cy.get('.mat-select-value-text > span').eq(1).should('contain.text', "Module SYNC 1");
            await cy.get('.mat-select-value-text > span').eq(2).should('contain.text', "AO 02");
            await cy.get('.mat-select-value-text > span').eq(3).should('contain.text', "0-20mA");
            await cy.get('.mat-select-value-text > span').eq(4).should('contain.text', "Hz");
            await cy.get('input[formcontrolname="y1"]').should('have.value', 0);
            await cy.get('input[formcontrolname="y2"]').should('have.value', 60);
            await cy.get('.mat-flat-button').eq(0).click();
            await cy.pause();

            //check Buzzer channel
            await cy.get('.sys-accordion__grid-item').eq(26).should('be.text', 'Buzzer');
            await cy.get('.sys-accordion__grid-item').eq(26).contains('Buzzer').click({force: true});
            await cy.get('.mat-select-value-text > span').eq(0).should('contain.text', "Buzzer");
            await cy.get('.mat-select-value-text > span').eq(1).should('contain.text', "Module 8DI/8DO");
            await cy.get('.mat-select-value-text > span').eq(2).should('contain.text', "DI 04");
            await cy.get('.mat-select-value-text > span').eq(3).should('contain.text', "False (opened)");
            await cy.get('input[formcontrolname="thresholdDuration"]').should('have.value', 1);
            await cy.get('input[formcontrolname="malfunctionLimit"]').should('have.value', 3);
            await cy.get('.mat-input-element').eq(3).should('have.value', "01");

            await cy.get('.mat-flat-button').eq(0).click();

            //check custom Digital
            await cy.get('.sys-accordion__grid-item').eq(30).should('be.text', 'Custom Digital');
            await cy.get('.sys-accordion__grid-item').eq(30).contains('Custom Digital').click({force: true});
            await cy.get('input[formcontrolname="name"]').should('have.value', "Custom Digital");
            await cy.get('.mat-select-value-text > span').eq(0).should('contain.text', "Module 8DI/8DO");
            await cy.get('.mat-select-value-text > span').eq(1).should('contain.text', "DO 04");
            await cy.get('.mat-flat-button').eq(0).click();

            await editChannels();
        }

        async function editChannels() {
            //edit custom analog
            await cy.get('.sys-accordion__grid-item').eq(14).contains('Custom Analog').click({force: true});
            await cy.get('input[formcontrolname="name"]').clear().type("New Custom Analog");
            await cy.get('.mat-select').eq(0).click().get('.mat-option').contains("Module SYNC 1").click();
            await cy.get('.mat-select').eq(1).click().get('.mat-option').contains("AI 02").click();
            await cy.get('.mat-select').eq(2).click().get('.mat-option').contains("0-20mA").click();
            await cy.get('.mat-select').eq(3).click().get('.mat-option').contains("A").click();
            await cy.get('input[formcontrolname="y1"]').clear().type(2);
            await cy.get('input[formcontrolname="y2"]').clear().type(40);
            await cy.get('.io-malfunction__delete').click({force: true});
            await cy.wait(1000);
            await cy.get('.mat-flat-button').eq(1).click();

            await cy.wait(2000);

            //edit VFD Speed Channel
            await cy.get('.sys-accordion__grid-item').eq(22).contains('VFD Speed').click({force: true});
            await cy.get('.mat-select').eq(1).click().get('.mat-option').contains("Module SYNC 1").click();
            await cy.get('.mat-select').eq(2).click().get('.mat-option').contains("AO 01").click();
            await cy.get('.mat-select').eq(3).click().get('.mat-option').contains("0-10V").click();
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

            //edit Buzzer channel digital
            await cy.get('.sys-accordion__grid-item').eq(26).contains('Buzzer').click({force: true});
            await cy.get('.mat-select').eq(2).click().get('.mat-option').contains("DO 01").click();
            await cy.get('.io-malfunction__delete').click({force: true});
            await cy.wait(1000);
            await cy.get('.mat-flat-button').eq(1).click();

            await cy.wait(2000);

            //edit custom digital
            await cy.get('.sys-accordion__grid-item').eq(30).contains('Custom Digital').click({force: true});
            await cy.get('.mat-checkbox-input').check({force: true});
            await cy.get('input[formcontrolname="name"]').clear().type("New Custom Digital");
            await cy.get('.mat-select').eq(1).click().get('.mat-option').contains("DO 01").click();
            await cy.get('.mat-flat-button').eq(1).click();

            await cy.wait(2000);

            // edit Motor channel
            await cy.get('.sys-accordion__grid-item').eq(38).contains('Motor').click({force: true});
            await cy.get('.io-add-malf').click();
            await cy.get('.mat-checkbox-input').eq(1).check({force: true});
            await cy.get('.mat-select').eq(3).click().get('.mat-option').contains("False (opened)").click();
            await cy.get('input[formcontrolname="thresholdDuration"]').clear().type(1);
            await cy.get('input[formcontrolname="malfunctionLimit"]').clear().type(3);
            await cy.get('.mat-input-element').eq(3).clear().type(1);
            await cy.get('.mat-flat-button').eq(1).click();

            await cy.wait(2000);

            await checkEditChannels();
        }

        async function checkEditChannels() {
            //check custom analog
            await cy.get('.sys-accordion__grid-item').eq(14).should('be.text', 'New Custom Analog');
            await cy.get('.sys-accordion__grid-item').eq(14).contains('New Custom Analog').click({force: true});
            await cy.get('input[formcontrolname="name"]').should('have.value', "New Custom Analog");
            await cy.get('.mat-select-value-text > span').eq(0).should('contain.text', "Module SYNC 1");
            await cy.get('.mat-select-value-text > span').eq(1).should('contain.text', "AI 02");
            await cy.get('.mat-select-value-text > span').eq(2).should('contain.text', "0-20mA");
            await cy.get('.mat-select-value-text > span').eq(3).should('contain.text', "A");
            await cy.get('input[formcontrolname="y1"]').should('have.value', 2);
            await cy.get('input[formcontrolname="y2"]').should('have.value', 40);
            await cy.get('.mat-flat-button').eq(0).click();

            //check VFD speed channel
            await cy.get('.sys-accordion__grid-item').eq(22).should('be.text', 'VFD Speed');
            await cy.get('.sys-accordion__grid-item').eq(22).contains('VFD Speed').click({force: true});
            await cy.get('.mat-select-value-text > span').eq(0).should('contain.text', "VFD Speed");
            await cy.get('.mat-select-value-text > span').eq(1).should('contain.text', "Module SYNC 1");
            await cy.get('.mat-select-value-text > span').eq(2).should('contain.text', "AO 01");
            await cy.get('.mat-select-value-text > span').eq(3).should('contain.text', "0-10V");
            await cy.get('.mat-select-value-text > span').eq(4).should('contain.text', "Hz");
            await cy.get('input[formcontrolname="y1"]').should('have.value', 0);
            await cy.get('input[formcontrolname="y2"]').should('have.value', 60);
            await cy.get('.mat-checkbox-input').eq(1).should('be.checked');
            await cy.get('.mat-select-value-text > span').eq(5).should('contain.text', "Min");
            await cy.get('input[formcontrolname="value"]').should('have.value', 20);
            await cy.get('input[formcontrolname="thresholdDuration"]').should('have.value', 2);
            await cy.get('input[formcontrolname="malfunctionLimit"]').should('have.value', 4);
            await cy.get('.mat-input-element').eq(6).should('have.value', "01");
            await cy.get('.mat-flat-button').eq(0).click();
            await cy.pause();

            //check Buzzer channel
            await cy.get('.sys-accordion__grid-item').eq(26).should('be.text', 'Buzzer');
            await cy.get('.sys-accordion__grid-item').eq(26).contains('Buzzer').click({force: true});
            await cy.get('.mat-select-value-text > span').eq(0).should('contain.text', "Buzzer");
            await cy.get('.mat-select-value-text > span').eq(1).should('contain.text', "Module 8DI/8DO");
            await cy.get('.mat-select-value-text > span').eq(2).should('contain.text', "DI 04");
            await cy.get('.mat-flat-button').eq(0).click();

            //check Motor channel
            await cy.get('.sys-accordion__grid-item').eq(38).should('be.text', 'Motor');
            await cy.get('.sys-accordion__grid-item').eq(38).contains('Motor').click({force: true});
            await cy.get('.io-add-malf').click();
            await cy.get('.mat-checkbox-input').eq(1).check({force: true});
            await cy.get('.mat-select').eq(3).click().get('.mat-option').contains("False (opened)").click();
            await cy.get('input[formcontrolname="thresholdDuration"]').clear().type(1);
            await cy.get('input[formcontrolname="malfunctionLimit"]').clear().type(3);
            await cy.get('.mat-input-element').eq(3).clear().type(1);
            await cy.get('.mat-flat-button').eq(0).click();

            //check custom Digital
            await cy.get('.sys-accordion__grid-item').eq(42).should('be.text', 'New Custom Digital');
            await cy.get('.sys-accordion__grid-item').eq(42).contains('New Custom Digital').click({force: true});
            await cy.get('input[formcontrolname="name"]').should('have.value', "New Custom Digital");
            await cy.get('.mat-select-value-text > span').eq(0).should('contain.text', "Module 8DI/8DO");
            await cy.get('.mat-select-value-text > span').eq(1).should('contain.text', "DO 01");
            await cy.get('.mat-flat-button').eq(0).click();
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
            cy.get('.sis-tabs__item').contains('I/O').click();
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
                cy.get('#logOutId').click({force: true});
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
