/// <reference types="cypress" />
// @ts-check

import {
  CHANGING_BORDER_STYLE,
  DEFAULT_BORDER_STYLE,
  MODIFIED_BORDER_STYLE,
} from "../../../src/constants/border-styles";
import {
  A_HREF_RECURSION,
  BUTTON_TEST_ID_BTN,
  DIV_CLASS_CIRCLE_CIRCLE,
  INPUT_PLACEHOLDER_ENTER_TEXT,
} from "../../../src/constants/cy-selectors";
import { DELAY_IN_MS } from "../../../src/constants/delays";

describe("the list of circles is displayed correctly", function () {
  const testValue = "iron";
  const testStepsArr = [
    ["i", "r", "o", "n"],
    ["n", "r", "o", "i"],
    ["n", "o", "r", "i"],
  ];

  let stepsCount = 0;

  function getBorderStyle(
    index: number,
    maxIndex: number,
    currentStep: number
  ): string {
    const maxStepCount = Math.ceil(maxIndex / 2);
    if (currentStep === maxStepCount) return DEFAULT_BORDER_STYLE;

    if (index < currentStep || index > maxIndex - currentStep)
      return MODIFIED_BORDER_STYLE;

    if (index === currentStep || index === maxIndex - currentStep)
      return CHANGING_BORDER_STYLE;

    return DEFAULT_BORDER_STYLE;
  }

  function checkCirclesListState(listLength: number, stepsCount: number) {
    cy.get("ul").children().should("have.length", testValue.length);

    for (let i = 0; i < listLength; i++) {
      const borderStyle = getBorderStyle(i, listLength - 1, stepsCount);
      cy.get(`div[data-testid="circle-${i}"]`)
        .children(DIV_CLASS_CIRCLE_CIRCLE)
        .should("have.css", "border", borderStyle);
    }
  }

  before(function () {
    cy.visit("/");

    cy.get(A_HREF_RECURSION).click();
    cy.get(INPUT_PLACEHOLDER_ENTER_TEXT).type(testValue);
    cy.get(BUTTON_TEST_ID_BTN).click();
  });

  it("the list of circles is displayed correctly at all steps of the algorithm", function () {
    while (stepsCount < testStepsArr.length) {
      cy.clock();
      checkCirclesListState(testValue.length, stepsCount);
      cy.tick(stepsCount * DELAY_IN_MS);
      ++stepsCount;
      cy.clock().invoke("restore");
    }
  });
});
