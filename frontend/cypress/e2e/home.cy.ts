describe("Countries Application", () => {
	beforeEach(() => {
		cy.visit("/");
	});

	it("displays the nav bar correctly", () => {
		cy.findByRole("banner").should("exist");
		cy.findByRole("link", { name: "Home" }).should("exist");
		cy.findByRole("link", { name: "Countries" }).should("exist");
	});
	it("Shows a list of countries", () => {
		cy.findByRole("link", { name: "Countries" }).click();
		cy.url().should("include", "/countries");
	});
	it("Shows test data", () => {
		cy.findByRole("link", { name: "Test" }).click();
		cy.url().should("include", "/test");
	});
	it("Shows test data table", () => {
		cy.findByRole("link", { name: "Test" }).click();
		cy.url().should("include", "/test");
		cy.get("table").should("exist");
	});
	it("More that 200 countries are displayed", () => {
		cy.findByRole("link", { name: "Countries" }).click();
		cy.get(".MuiCard-root").should("have.length.greaterThan", 200);
	});
});
