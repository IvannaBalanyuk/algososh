import { SHORT_DELAY_IN_MS } from "../../../src/constants/delays";
import { HREF_ATTR_VALUES } from "../../../src/constants/href-attribute-values";

interface TParams {
  headInd: number;
  tailInd: number;
  isAlgorithmInProgress: boolean;
}

interface TParamsForDeleteAlgorithm extends TParams {
  deletedInd: number;
}

describe("the list of circles is displayed correctly", function () {
  const defaultBorderStyle = "4px solid rgb(0, 50, 255)";
  const changingBorderStyle = "4px solid rgb(210, 82, 225)";
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
        .children("div[class^=circle_circle]")
        .as("circle");
      cy.get("@circle").siblings().contains(`${i}`);

      if (isAlgorithmInProgress) {
        if (isPrevTailItem) {
          cy.get("@circle").siblings().should("not.contain.text", "tail");
          cy.get("@circle").should("have.css", "border", defaultBorderStyle);
        }

        if (isTailItem) {
          cy.get("@circle").siblings().contains("tail");
          cy.get("@circle").should("have.css", "border", changingBorderStyle);
        }
      }

      if (!isAlgorithmInProgress) {
        cy.get("@circle").should("have.css", "border", defaultBorderStyle);
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
        .children("div[class^=circle_circle]")
        .as("circle");
      cy.get("@circle").siblings().contains(`${i}`);

      if (isAlgorithmInProgress) {
        if (isDeletedItem) {
          cy.get("@circle").children().should("contain.text", `${testArr[i]}`);
          cy.get("@circle").siblings().contains("head");
          cy.get("@circle").should("have.css", "border", changingBorderStyle);
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
        .children("div[class^=circle_circle]")
        .as("circle");
      cy.get("@circle").siblings().contains(`${i}`);

      if (isAlgorithmInProgress) {
        cy.get("@circle").should("have.css", "border", defaultBorderStyle);
        cy.get("@circle").children().contains(`${testArr[i]}`);

        if (isTailItem) {
          cy.get("@circle").siblings().contains("tail");
        }

        if (isHeadItem) {
          cy.get("@circle").siblings().contains("head");
        }
      }

      if (!isAlgorithmInProgress) {
        cy.get("@circle").should("have.css", "border", defaultBorderStyle);
        cy.get("@circle")
          .children()
          .should("not.contain.text", `${testArr[i]}`);
      }
    }
  }

  beforeEach(function () {
    cy.visit("/");

    cy.get(`a[href*="${HREF_ATTR_VALUES.queue}"]`).click();
    cy.get(`input[placeholder="Введите текст"]`).as("input");
    cy.get(`button[data-testid="addButton"]`).as("addButton");
    cy.get(`button[data-testid="deleteButton"]`).as("deleteButton");
    cy.get(`button[data-testid="clearButton"]`).as("clearButton");
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
