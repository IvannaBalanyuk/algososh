/// <reference types="cypress" />
// @ts-check

import {
  CHANGING_BORDER_STYLE,
  DEFAULT_BORDER_STYLE,
} from "../../../src/constants/border-styles";
import {
  A_HREF_STACK,
  BUTTON_TEST_ID_ADD_BTN,
  BUTTON_TEST_ID_CLEAR_BTN,
  BUTTON_TEST_ID_DEL_BTN,
  DIV_CLASS_CIRCLE_CIRCLE,
  INPUT_PLACEHOLDER_ENTER_TEXT,
} from "../../../src/constants/cy-selectors";
import { SHORT_DELAY_IN_MS } from "../../../src/constants/delays";

describe("the list of circles is displayed correctly", function () {
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
          .children(DIV_CLASS_CIRCLE_CIRCLE)
          .as("circle");
        cy.get("@circle").children().contains(testArr[i]);
        cy.get("@circle").next().contains(`${i}`);

        const isLastCircle = i === count - 1;
        if (isAlgorithmInProgress && isLastCircle) {
          cy.get("@circle").should("have.css", "border", CHANGING_BORDER_STYLE);
          cy.get("@circle").prev().contains("top");
        } else {
          cy.get("@circle").should("have.css", "border", DEFAULT_BORDER_STYLE);
        }
      }
    }
  }

  beforeEach(function () {
    cy.visit("/");

    cy.get(A_HREF_STACK).click();
    cy.get(INPUT_PLACEHOLDER_ENTER_TEXT).as("input");
    cy.get(BUTTON_TEST_ID_ADD_BTN).as("addButton");
    cy.get(BUTTON_TEST_ID_DEL_BTN).as("deleteButton");
    cy.get(BUTTON_TEST_ID_CLEAR_BTN).as("clearButton");
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
