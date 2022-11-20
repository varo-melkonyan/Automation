const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "8wfvz9",
  chromeWebSecurity: false,

  e2e: {
    resolution: "high",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "angular",
      bundler: "webpack",
    },
    specPattern: "**/*.cy.ts",
  },
});
