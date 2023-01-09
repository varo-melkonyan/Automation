describe('empty spec', () => {
  const validLogin = "varazdat.gm@ovaktechnologies.com";    //valid login
  const validPassword = "Aa1234$#@!";                       //valid password

  
  let chars = 'abcdefghijklmnopqrstuvwxyz1234567890';       //invalid login
  let string = '';                                          //invalid password
  for(let i = 0; i < 15; i++){
      string += chars[Math.floor(Math.random() * chars.length)];
  }
  const invalidLogin = string + '@gmail.com';
  const invalidPassword = string;

  it('Login with invalid login and password', () => {
    cy.viewport(1920, 1520);
    cy.visit('http://104.211.19.125:8282/');
    cy.wait(2000);
    cy.url().then((url) => {
      cy.log(url);
      if ((url === 'https://automation.wellworxenergy.com/')) {
        cy.get("[name=username]").type(invalidLogin);
        cy.get("[name=password]").type(invalidPassword);
        cy.get("input[type=submit]").click();
      }
      else {
        cy.get('.sis-account__button').click();
        cy.get('#logOutId').click({force: true});
        cy.url().should("eq", "https://automation.wellworxenergy.com/");
      }
    })
    cy.pause();
  })

  it('Login with invalid login and valid password', () => {
    cy.viewport(1920, 1520);
    cy.visit('http://104.211.19.125:8282/');
    cy.wait(2000);
    cy.url().then((url) => {
      cy.log(url);
      if ((url === 'https://automation.wellworxenergy.com/')) {
        cy.get("[name=username]").type(invalidLogin);
        cy.get("[name=password]").type(validPassword);
        cy.get("input[type=submit]").click();
      }
      else {
        cy.get('.sis-account__button').click();
        cy.get('#logOutId').click({force: true});
        cy.url().should("eq", "https://automation.wellworxenergy.com/");
      }
    })
    cy.pause();
  })

  it('Login with valid login and invalid password', () => {
    cy.viewport(1920, 1520);
    cy.visit('http://104.211.19.125:8282/');
    cy.wait(2000);
    cy.url().then((url) => {
      cy.log(url);
      if ((url === 'https://automation.wellworxenergy.com/')) {
        cy.get("[name=username]").type(validLogin);
        cy.get("[name=password]").type(invalidPassword);
        cy.get("input[type=submit]").click();
      }
      else {
        cy.get('.sis-account__button').click();
        cy.get('#logOutId').click({force: true});
        cy.url().should("eq", "https://automation.wellworxenergy.com/");
      }
    })
    cy.pause();
  })
  
  it('Login with valid login and password', () => {
    cy.viewport(1920, 1520);
    cy.visit('http://104.211.19.125:8282/');
    cy.wait(2000);
    cy.url().then((url) => {
      cy.log(url);
      if ((url === 'https://automation.wellworxenergy.com/')) {
        cy.get("[name=username]").type(validLogin);
        cy.get("[name=password]").type(validPassword);
        cy.get("input[type=submit]").click();
      }
      else {
        cy.get('.sis-account__button').click();
        cy.get('#logOutId').click({force: true});
        cy.url().should("eq", "https://automation.wellworxenergy.com/");
      }
    })
    cy.pause();
  })
})
