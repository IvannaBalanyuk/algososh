/// <reference types="cypress" />
// @ts-check

import {
  CHANGING_BORDER_STYLE,
  DEFAULT_BORDER_STYLE,
} from "../../../src/constants/border-styles";
import {
  A_HREF_QUEUE,
  BUTTON_TEST_ID_ADD_BTN,
  BUTTON_TEST_ID_CLEAR_BTN,
  BUTTON_TEST_ID_DEL_BTN,
  DIV_CLASS_CIRCLE_CIRCLE,
  INPUT_PLACEHOLDER_ENTER_TEXT,
} from "../../../src/constants/cy-selectors";
import { SHORT_DELAY_IN_MS } from "../../../src/constants/delays";

interface TParams {
  headInd: number;
  tailInd: number;
  isAlgorithmInProgress: boolean;
}

interface TParamsForDeleteAlgorithm extends TParams {
  deletedInd: number;
}

describe("the list of circles is displayed correctly", function () {
  const testArr = [13, 42, 73];
  let currentCount = 0;
  let headIndex = 0;
  let tailIndex = 0;
  let deletedIndex = 0;

  function checkStateForAddAlgorithm({
    headInd,
    tailInd,
    isAlgorithmInProgress,
  }: TParams) {
    for (let i = headInd; i <= tailInd; i++) {
      const isTailItem = i === tailInd;
      const isPrevTailItem = i === tailInd - 1;

      cy.get(`div[data-testid="circle-${i}"]`)
        .children(DIV_CLASS_CIRCLE_CIRCLE)
        .as("circle");
      cy.get("@circle").siblings().contains(`${i}`);

      if (isAlgorithmInProgress) {
        if (isPrevTailItem) {
          cy.get("@circle").siblings().should("not.contain.text", "tail");
          cy.get("@circle").should("have.css", "border", DEFAULT_BORDER_STYLE);
        }

        if (isTailItem) {
          cy.get("@circle").siblings().contains("tail");
          cy.get("@circle").should("have.css", "border", CHANGING_BORDER_STYLE);
        }
      }

      if (!isAlgorithmInProgress) {
        cy.get("@circle").should("have.css", "border", DEFAULT_BORDER_STYLE);
        cy.get("@circle").children().contains(`${testArr[i]}`);
      }
    }
  }

  function checkStateForDeleteAlgorithm({
    headInd,
    tailInd,
    deletedInd,
    isAlgorithmInProgress,
  }: TParamsForDeleteAlgorithm) {
    for (let i = deletedInd; i <= tailInd; i++) {
      const isHeadItem = i === headInd;
      const isDeletedItem = i === deletedInd;

      cy.get(`div[data-testid="circle-${i}"]`)
        .children(DIV_CLASS_CIRCLE_CIRCLE)
        .as("circle");
      cy.get("@circle").siblings().contains(`${i}`);

      if (isAlgorithmInProgress) {
        if (isDeletedItem) {
          cy.get("@circle").children().should("contain.text", `${testArr[i]}`);
          cy.get("@circle").siblings().contains("head");
          cy.get("@circle").should("have.css", "border", CHANGING_BORDER_STYLE);
        }
      }

      if (!isAlgorithmInProgress) {
        if (isDeletedItem) {
          cy.get("@circle")
            .children()
            .should("not.contain.text", `${testArr[i]}`);
          cy.get("@circle").siblings().should("not.contain.text", "head");
        }

        if (isHeadItem && headInd !== deletedInd) {
          cy.get("@circle").siblings().contains("head");
          cy.get("@circle").children().should("contain.text", `${testArr[i]}`);
        }
      }
    }
  }

  function checkStateForClearAlgorithm({
    headInd,
    tailInd,
    isAlgorithmInProgress,
  }: TParams) {
    for (let i = headInd; i <= tailInd; i++) {
      const isHeadItem = i === headInd;
      const isTailItem = i === tailInd;

      cy.get(`div[data-testid="circle-${i}"]`)
        .children(DIV_CLASS_CIRCLE_CIRCLE)
        .as("circle");
      cy.get("@circle").siblings().contains(`${i}`);

      if (isAlgorithmInProgress) {
        cy.get("@circle").should("have.css", "border", DEFAULT_BORDER_STYLE);
        cy.get("@circle").children().contains(`${testArr[i]}`);

        if (isTailItem) {
          cy.get("@circle").siblings().contains("tail");
        }

        if (isHeadItem) {
          cy.get("@circle").siblings().contains("head");
        }
      }

      if (!isAlgorithmInProgress) {
        cy.get("@circle").should("have.css", "border", DEFAULT_BORDER_STYLE);
        cy.get("@circle")
          .children()
          .should("not.contain.text", `${testArr[i]}`);
      }
    }
  }

  beforeEach(function () {
    cy.visit("/");

    cy.get(A_HREF_QUEUE).click();
    cy.get(INPUT_PLACEHOLDER_ENTER_TEXT).as("input");
    cy.get(BUTTON_TEST_ID_ADD_BTN).as("addButton");
    cy.get(BUTTON_TEST_ID_DEL_BTN).as("deleteButton");
    cy.get(BUTTON_TEST_ID_CLEAR_BTN).as("clearButton");
  });

  afterEach(function () {
    headIndex = 0;
    tailIndex = 0;
    currentCount = 0;
    deletedIndex = 0;
  });

  it("the list of circles is displayed correctly at all steps of adding algorithm", function () {
    while (currentCount < testArr.length) {
      cy.clock();

      // add element
      cy.get("@input").type(String(testArr[currentCount]));
      cy.get("@addButton").click();

      if (currentCount === 0) {
        headIndex = 0;
        tailIndex = 0;
      } else {
        ++tailIndex;
      }
      ++currentCount;

      // check state when algorithm in progress
      cy.tick(SHORT_DELAY_IN_MS / 2);
      checkStateForAddAlgorithm({
        headInd: headIndex,
        tailInd: tailIndex,
        isAlgorithmInProgress: true,
      });

      // check state when algorithm is finished
      cy.tick(SHORT_DELAY_IN_MS);
      checkStateForAddAlgorithm({
        headInd: headIndex,
        tailInd: tailIndex,
        isAlgorithmInProgress: false,
      });

      cy.clock().invoke("restore");
    }
  });

  it("the list of circles is displayed correctly at all steps of deleting algorithm", function () {
    // add elements
    testArr.forEach((item) => {
      cy.get("@input").type(String(item));
      cy.get("@addButton").click();
      if (currentCount === 0) {
        headIndex = 0;
        tailIndex = 0;
      } else {
        ++tailIndex;
      }
      ++currentCount;
    });

    while (currentCount > 0) {
      cy.clock();

      cy.get("@deleteButton").click();
      if (headIndex < tailIndex) {
        deletedIndex = headIndex;
        ++headIndex;
      } else {
        deletedIndex = headIndex;
      }
      --currentCount;

      // check state when algorithm in progress
      cy.tick(SHORT_DELAY_IN_MS / 2);
      checkStateForDeleteAlgorithm({
        headInd: headIndex,
        tailInd: tailIndex,
        deletedInd: deletedIndex,
        isAlgorithmInProgress: true,
      });

      // check state when algorithm is finished
      cy.tick(SHORT_DELAY_IN_MS);
      checkStateForDeleteAlgorithm({
        headInd: headIndex,
        tailInd: tailIndex,
        deletedInd: deletedIndex,
        isAlgorithmInProgress: false,
      });

      cy.clock().invoke("restore");
    }
  });

  it("the list of circles is displayed correctly at all steps of the clearing algorithm", function () {
    // add elements
    testArr.forEach((item) => {
      cy.get("@input").type(String(item));
      cy.get("@addButton").click();
      if (currentCount === 0) {
        headIndex = 0;
        tailIndex = 0;
      } else {
        ++tailIndex;
      }
      ++currentCount;
    });

    cy.clock();

    cy.get("@clearButton").click();

    // check state when algorithm in progress
    cy.tick(SHORT_DELAY_IN_MS / 2);
    checkStateForClearAlgorithm({
      headInd: headIndex,
      tailInd: tailIndex,
      isAlgorithmInProgress: true,
    });

    // check state when algorithm is finished
    cy.tick(SHORT_DELAY_IN_MS);
    checkStateForClearAlgorithm({
      headInd: headIndex,
      tailInd: tailIndex,
      isAlgorithmInProgress: false,
    });

    cy.clock().invoke("restore");
  });
});
