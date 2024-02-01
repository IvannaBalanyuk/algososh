import { SHORT_DELAY_IN_MS } from "../../../src/constants/delays";
import { HREF_ATTR_VALUES } from "../../../src/constants/href-attribute-values";

describe("the list of circles is displayed correctly", function () {
  const defaultBorderStyle = "4px solid rgb(0, 50, 255)";
  const changingBorderStyle = "4px solid rgb(210, 82, 225)";
  const testArr = [13, 42, 73];
  let currentCount = 0;

  function checkCirclesListState(
    count: number,
    isAlgorithmInProgress: boolean = false
  ) {
    cy.get("ul").children().should("have.length", count);

    for (let i = 0; i < count; i++) {
      if (isAlgorithmInProgress) {
        cy.get(`div[data-testid="circle-${i}"]`)
          .children("div[class^=circle_circle]")
          .as("circle");
        cy.get("@circle").children().contains(testArr[i]);
        cy.get("@circle").next().contains(`${i}`);

        const isLastCircle = i === count - 1;
        if (isAlgorithmInProgress && isLastCircle) {
          cy.get("@circle").should("have.css", "border", changingBorderStyle);
          cy.get("@circle").prev().contains("top");
        } else {
          cy.get("@circle").should("have.css", "border", defaultBorderStyle);
        }
      }
    }
  }

  beforeEach(function () {
    cy.visit("/");

    cy.get(`a[href*="${HREF_ATTR_VALUES.stack}"]`).click();
    cy.get(`input[placeholder="Введите текст"]`).as("input");
    cy.get(`button[data-testid="addButton"]`).as("addButton");
    cy.get(`button[data-testid="deleteButton"]`).as("deleteButton");
    cy.get(`button[data-testid="clearButton"]`).as("clearButton");
  });

  it("the list of circles is displayed correctly at all steps of the adding and deleting algorithms", function () {
    while (currentCount < testArr.length) {
      cy.clock();

      cy.get("@input").type(String(testArr[currentCount]));
      cy.get("@addButton").click();

      cy.tick(SHORT_DELAY_IN_MS / 2);
      ++currentCount;
      checkCirclesListState(currentCount, true);

      cy.tick(SHORT_DELAY_IN_MS);
      checkCirclesListState(currentCount);

      cy.clock().invoke("restore");
    }

    while (currentCount > 0) {
      cy.clock();

      cy.get("@deleteButton").click();

      cy.tick(SHORT_DELAY_IN_MS / 2);
      checkCirclesListState(currentCount, true);

      cy.tick(SHORT_DELAY_IN_MS);
      --currentCount;
      checkCirclesListState(currentCount);

      cy.clock().invoke("restore");
    }
  });

  it("the list of circles is displayed correctly at all steps of the clearing algorithm", function () {
    testArr.forEach((item) => {
      cy.get("@input").type(String(item));
      cy.get("@addButton").click();
    });

    cy.get("ul").children().should("have.length", testArr.length);
    cy.get("@clearButton").click();
    cy.get("ul").children().should("have.length", 0);
  });
});
