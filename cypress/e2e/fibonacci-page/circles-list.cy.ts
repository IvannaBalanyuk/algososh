/// <reference types="cypress" />
// @ts-check

import { SHORT_DELAY_IN_MS } from "../../../src/constants/delays";
import { DEFAULT_BORDER_STYLE } from "../../../src/constants/border-styles";
import {
  A_HREF_FIBONACCI,
  BUTTON_TEST_ID_BTN,
  DIV_CLASS_CIRCLE_CIRCLE,
  INPUT_PLACEHOLDER_ENTER_TEXT,
} from "../../../src/constants/cy-selectors";

describe("the list of circles is displayed correctly", function () {
  const testValue = "4";
  const testSequence = [1, 1, 2, 3, 5];
  let stepsCount = 1;

  function checkCirclesListState(count: number) {
    cy.get("ul").children().should("have.length", count);

    for (let i = 0; i < count; i++) {
      cy.get(`div[data-testid="circle-${i}"]`)
        .children(DIV_CLASS_CIRCLE_CIRCLE)
        .should("have.css", "border", DEFAULT_BORDER_STYLE)
        .contains(testSequence[i]);
    }
  }

  before(function () {
    cy.visit("/");

    cy.get(A_HREF_FIBONACCI).click();
    cy.get(INPUT_PLACEHOLDER_ENTER_TEXT).type(testValue);
    cy.get(BUTTON_TEST_ID_BTN).click();
  });

  it("the list of circles is displayed correctly at all steps of the algorithm", function () {
    while (stepsCount <= testSequence.length) {
      cy.clock();
      cy.tick(stepsCount * SHORT_DELAY_IN_MS);
      checkCirclesListState(stepsCount);
      ++stepsCount;
      cy.clock().invoke("restore");
    }
  });
});
