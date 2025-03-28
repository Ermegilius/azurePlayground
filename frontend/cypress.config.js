const { defineConfig } = require("cypress");

module.exports = defineConfig({
	e2e: {
		supportFile: "cypress/support/e2e.ts",
		baseUrl: "http://localhost:5180",
		setupNodeEvents(on, config) {
			// implement node event listeners here
			return config;
		},
	},
});
