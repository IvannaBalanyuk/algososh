export function checkButton(path: string, href: string, inputValue: string) {
  beforeEach(function () {
    cy.clock();
    cy.visit(path);
    cy.get(`a[href*=${href}]`).click();
    cy.get('input[placeholder*="Введите текст"]').as("input");
    cy.get('button[data-testid="button"]').as("button");
  });

  it("the button is disabled when the input is empty", function () {
    cy.get("@input").should("be.empty");
    cy.get("@button").should("be.disabled");
  });

  it("the button is not disabled when the input is not empty", function () {
    cy.get("@input").type(inputValue);
    cy.get("@button").should("not.be.disabled");
  });

  it("the button has a loader when the algorithm in progress", function () {
    cy.get("@input").type(inputValue);
    cy.get("@button").click();
    cy.tick(500);
    cy.get("@button").children("img[class^=button_loader_icon]");
  });
}
