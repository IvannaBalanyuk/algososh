import { HREF_ATTR_VALUES } from "../../../src/constants/href-attribute-values";
import { TEST_IDS } from "../../../src/constants/test-ids";

interface TParams {
  path: string,
  href: string,
  btnTestId?: string,
  delay: number,
}

interface TParamsWithInputValue extends TParams {
  inputPlaceholder?: string,
  inputValue: string,
}

export function checkButtonForInput({
  path,
  href,
  inputPlaceholder = "Введите текст",
  inputValue,
  btnTestId = TEST_IDS.button,
  delay}: TParamsWithInputValue
) {
  beforeEach(function () {
    cy.visit(path);
    cy.get(`a[href*=${href}]`).click();
    cy.get(`input[placeholder="${inputPlaceholder}"]`).as("input");
    cy.get(`button[data-testid="${btnTestId}"]`).as("button");
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
    cy.clock();
    cy.get("@input").type(inputValue);
    cy.get("@button").click();
    cy.tick(delay);
    cy.get("@button").children("img[class^=button_loader_icon]");
    cy.clock().invoke("restore");
  });
}

export function checkDeleteOrClearBtn({
  path,
  href,
  btnTestId = TEST_IDS.button,
  delay}: TParams
) {
  beforeEach(function () {
    cy.visit(path);
    cy.get(`a[href*=${href}]`).click();
    cy.get(`input[placeholder="Введите текст"]`).as("input");
    cy.get(`button[data-testid="${btnTestId}"]`).as("targetButton");
    cy.get(`button[data-testid="addButton"]`).as("addButton");
  });

  it("the button is disabled when the list is empty", function () {
    if (href === HREF_ATTR_VALUES.queue) {
      cy.get(`p[data-testid="${TEST_IDS.letter}"]`).should("be.empty");
    } else {
      cy.get("ul").children().should("have.length", 0);
    }
    cy.get("@targetButton").should("be.disabled");
  });

  it("the button is not disabled when the list is not empty", function () {
    cy.get("@input").type("42");
    cy.get("@addButton").click();
    cy.get("@targetButton").should("not.be.disabled");
  });

  it("the button has a loader when the algorithm in progress", function () {
    cy.get("@input").type("42");
    cy.get("@addButton").click();

    cy.clock();
    
    cy.get("@targetButton").click();
    cy.tick(delay);
    cy.get("@targetButton").children("img[class^=button_loader_icon]");

    cy.clock().invoke("restore");
  });
}
