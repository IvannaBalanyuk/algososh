import { SHORT_DELAY_IN_MS } from "../../../src/constants/delays";
import { HREF_ATTR_VALUES } from "../../../src/constants/href-attribute-values";
import { TEST_IDS } from "../../../src/constants/test-ids";

interface TCheckActionsWithHeadAndTail {
  length: number;
  headInd: number;
  tailInd: number;
  algorithmType?: "addToHead" | "addToTail" | "delFromHead" | "delFromTail";
  algorithmStep?: "first" | "second" | "finish";
}

interface TCheckActionsWithIndex {
  length: number;
  textInputValue: string;
  indexInputValue: number;
  stepCount: number;
  maxStepNum: number;
}

describe("the list of circles is displayed correctly", function () {
  const defaultBorderStyle = "4px solid rgb(0, 50, 255)";
  const changingBorderStyle = "4px solid rgb(210, 82, 225)";
  const modifiedBorderStyle = "4px solid rgb(127, 224, 81)";

  let testLength = 4;
  let testHeadIndex = 0;
  let testTailIndex = 3;

  function checkStepsState({
    length,
    headInd,
    tailInd,
    algorithmType,
    algorithmStep,
  }: TCheckActionsWithHeadAndTail) {
    cy.get("ul").children().should("have.length", length);

    for (let i = 0; i < length; i++) {
      const isTargetMarkedItem =
        algorithmType === "addToHead" || algorithmType === "delFromHead"
          ? i === headInd
          : i === tailInd;
      const isNotTargetMarkedItem =
        algorithmType === "addToHead" || algorithmType === "delFromHead"
          ? i === tailInd
          : i === headInd;

      const targetMarkText =
        algorithmType === "addToHead" || algorithmType === "delFromHead"
          ? "head"
          : "tail";
      const notTargetMarkText =
        algorithmType === "addToHead" || algorithmType === "delFromHead"
          ? "tail"
          : "head";

      const isPrevMarkedItem =
        algorithmType === "addToHead" ? i === headInd + 1 : i === tailInd - 1;

      cy.get(`div[data-testid="circle-${i}"]`)
        .children("div[class^=circle_circle]")
        .as("circle");
      cy.get("@circle").next().should("contain.text", `${i}`);

      if (!isTargetMarkedItem) {
        cy.get("@circle").children().should("not.be.empty");
        cy.get("@circle").should("have.css", "border", defaultBorderStyle);
      }

      if (isNotTargetMarkedItem) {
        cy.get("@circle").siblings().should("contain.text", notTargetMarkText);
      }

      if (
        isPrevMarkedItem &&
        (algorithmType === "addToHead" || algorithmType === "addToTail")
      ) {
        if (algorithmStep === "second" || algorithmStep === "finish") {
          cy.get("@circle")
            .siblings()
            .should("not.contain.text", targetMarkText);
        }
      }

      if (isTargetMarkedItem) {
        if (algorithmStep === "first") {
          cy.get("@circle").should("have.css", "border", defaultBorderStyle);

          if (algorithmType === "addToHead" || algorithmType === "addToTail") {
            cy.get("@circle").children().should("not.be.empty");
            cy.get("@circle")
              .prev()
              .find("div[class^=circle_circle]")
              .as("targetMarkCircle");
          } else {
            cy.get("@circle").children().should("be.empty");
            cy.get("@circle")
              .next()
              .next()
              .find("div[class^=circle_circle]")
              .as("targetMarkCircle");
          }

          cy.get("@targetMarkCircle").should("not.be.empty");
          cy.get("@targetMarkCircle").should(
            "have.css",
            "border",
            changingBorderStyle
          );
        }

        if (algorithmStep === "second") {
          cy.get("@circle").children().should("not.be.empty");
          cy.get("@circle").should("have.css", "border", modifiedBorderStyle);
          cy.get("@circle").siblings().should("contain.text", targetMarkText);
        }

        if (algorithmStep === "finish") {
          cy.get("@circle").children().should("not.be.empty");
          cy.get("@circle").should("have.css", "border", defaultBorderStyle);
          cy.get("@circle").siblings().should("contain.text", targetMarkText);
        }
      }
    }
  }

  function checkStepsForAddByIndex({
    length,
    textInputValue,
    indexInputValue,
    stepCount,
    maxStepNum,
  }: TCheckActionsWithIndex) {
    const isFinishStep = stepCount === maxStepNum;
    const isPreFinishStep = stepCount === maxStepNum - 1;

    const currLength = isFinishStep || isPreFinishStep ? length + 1 : length;
    const currStepIndex =
      stepCount - 1 <= indexInputValue ? stepCount - 1 : indexInputValue;

    for (let i = 0; i <= currLength - 1; i++) {
      const isCurrentStepIndex = i === currStepIndex;

      cy.get(`div[data-testid="circle-${i}"]`)
        .children("div[class^=circle_circle]")
        .as("circle");
      cy.get("@circle").children().should("not.be.empty");
      cy.get("@circle").next().should("contain.text", `${i}`);

      // check head state
      if (stepCount === 1 && i === 0) {
        cy.get("@circle").siblings().should("not.contain.text", "head");
      }

      // check tail state
      if (i === currLength - 1) {
        cy.get("@circle").siblings().should("contain.text", "tail");
      }

      if (!isFinishStep && !isPreFinishStep) {
        // check already walked indexes state
        if (i < stepCount) {
          cy.get("@circle").should("have.css", "border", changingBorderStyle);
        } else {
          cy.get("@circle").should("have.css", "border", defaultBorderStyle);
        }

        if (isCurrentStepIndex) {
          cy.get("@circle")
            .prev()
            .find("div[class^=circle_circle]")
            .as("headCircle");

          cy.get("@headCircle").should("contain.text", `${textInputValue}`);
          cy.get("@headCircle").should(
            "have.css",
            "border",
            changingBorderStyle
          );
        }
      }

      if (isPreFinishStep) {
        if (isCurrentStepIndex) {
          cy.get("@circle").should("have.css", "border", modifiedBorderStyle);
          cy.get("@circle").should("contain.text", `${textInputValue}`);
          cy.get("@circle").prev().should("be.empty");
        } else {
          cy.get("@circle").should("have.css", "border", defaultBorderStyle);
        }
      }

      if (isFinishStep) {
        if (isCurrentStepIndex) {
          cy.get("@circle").should("have.css", "border", defaultBorderStyle);
          cy.get("@circle").should("contain.text", `${textInputValue}`);
          cy.get("@circle").prev().should("be.empty");
        } else {
          cy.get("@circle").should("have.css", "border", defaultBorderStyle);
        }
      }
    }
  }

  function checkStepsForDeleteByIndex({
    length,
    textInputValue,
    indexInputValue,
    stepCount,
    maxStepNum,
  }: TCheckActionsWithIndex) {
    const isFinishStep = stepCount === maxStepNum;
    const isPreFinishStep = stepCount === maxStepNum - 1;

    const currLength = isFinishStep ? length - 1 : length;

    for (let i = 0; i <= currLength - 1; i++) {
      const tailIndex = currLength - 1;
      const isTailEqTargetIndex = tailIndex === indexInputValue;

      cy.get(`div[data-testid="circle-${i}"]`)
        .children("div[class^=circle_circle]")
        .as("circle");
      cy.get("@circle").next().should("contain.text", `${i}`);

      // check head state
      if (i === 0) {
        cy.get("@circle").siblings().should("contain.text", "head");
      }

      if (i === tailIndex) {
        if (isPreFinishStep && isTailEqTargetIndex) {
          cy.get("@circle").siblings().should("not.contain.text", "tail");
        } else {
          cy.get("@circle").siblings().should("contain.text", "tail");
        }
      }

      if (!isFinishStep && !isPreFinishStep) {
        cy.get("@circle").children().should("not.be.empty");

        // check already walked indexes state
        if (i < stepCount) {
          cy.get("@circle").should("have.css", "border", changingBorderStyle);
        } else {
          cy.get("@circle").should("have.css", "border", defaultBorderStyle);
        }
      }

      if (isPreFinishStep) {
        if (i === indexInputValue) {
          cy.get("@circle").children().should("be.empty");

          cy.get("@circle")
            .next()
            .next()
            .find("div[class^=circle_circle]")
            .as("tailCircle");
          cy.get("@tailCircle").should("not.be.empty");
          cy.get("@tailCircle").should(
            "have.css",
            "border",
            changingBorderStyle
          );
        } else {
          cy.get("@circle").children().should("not.be.empty");
        }

        cy.get("@circle").should("have.css", "border", defaultBorderStyle);
      }

      if (isFinishStep) {
        cy.get("@circle").children().should("not.be.empty");
        cy.get("@circle").should("have.css", "border", defaultBorderStyle);

        if (i === tailIndex) {
          cy.get("@circle").siblings().should("contain.text", "tail");
        }
      }
    }
  }

  beforeEach(function () {
    cy.visit("/");

    cy.get(`a[href*="${HREF_ATTR_VALUES.list}"]`).click();
    cy.get(`input[placeholder="Введите текст"]`).as("textInput");
    cy.get(`input[placeholder="Введите индекс"]`).as("indexInput");
    cy.get(`button[data-testid="${TEST_IDS.addToHeadBtn}"]`).as("addToHeadBtn");
    cy.get(`button[data-testid="${TEST_IDS.addToTailBtn}"]`).as("addToTailBtn");
    cy.get(`button[data-testid="${TEST_IDS.deleteFromHeadBtn}"]`).as(
      "deleteFromHeadBtn"
    );
    cy.get(`button[data-testid="${TEST_IDS.deleteFromTailBtn}"]`).as(
      "deleteFromTailBtn"
    );
    cy.get(`button[data-testid="${TEST_IDS.addByIndexBtn}"]`).as(
      "addByIndexBtn"
    );
    cy.get(`button[data-testid="${TEST_IDS.deleteByIndexBtn}"]`).as(
      "deleteByIndexBtn"
    );
  });

  afterEach(function () {
    testLength = 4;
    testHeadIndex = 0;
    testTailIndex = 3;
  });

  it("initial list is displayed correctly", function () {
    cy.get("ul").children().should("have.length", testLength);

    for (let i = 0; i < testLength; i++) {
      const isHeadItem = i === testHeadIndex;
      const isTailItem = i === testTailIndex;

      cy.get(`div[data-testid="circle-${i}"]`)
        .children("div[class^=circle_circle]")
        .as("circle");
      cy.get("@circle").children().should("not.be.empty");
      cy.get("@circle").siblings().contains(`${i}`);
      cy.get("@circle").should("have.css", "border", defaultBorderStyle);

      if (isHeadItem) {
        cy.get("@circle").siblings().contains("head");
      }

      if (isTailItem) {
        cy.get("@circle").siblings().contains("tail");
      }
    }
  });

  it("list is displayed correctly at all steps of add-to-head algorithm", function () {
    cy.clock();

    // add item to head
    cy.get("@textInput").type("42");
    cy.get("@addToHeadBtn").click();

    // check state at first step of algorithm
    checkStepsState({
      length: testLength,
      headInd: testHeadIndex,
      tailInd: testTailIndex,
      algorithmType: "addToHead",
      algorithmStep: "first",
    });

    // check state at second step of algorithm
    ++testLength;
    ++testTailIndex;
    cy.tick(SHORT_DELAY_IN_MS);
    checkStepsState({
      length: testLength,
      headInd: testHeadIndex,
      tailInd: testTailIndex,
      algorithmType: "addToHead",
      algorithmStep: "second",
    });

    // check state when algorithm is finished
    cy.tick(SHORT_DELAY_IN_MS * 2);
    checkStepsState({
      length: testLength,
      headInd: testHeadIndex,
      tailInd: testTailIndex,
      algorithmType: "addToHead",
      algorithmStep: "finish",
    });

    cy.clock().invoke("restore");
  });

  it("list is displayed correctly at all steps of add-to-tail algorithm", function () {
    cy.clock();

    // add item to tail
    cy.get("@textInput").type("42");
    cy.get("@addToTailBtn").click();

    // check state at first step of algorithm
    checkStepsState({
      length: testLength,
      headInd: testHeadIndex,
      tailInd: testTailIndex,
      algorithmType: "addToTail",
      algorithmStep: "first",
    });

    // check state at second step of algorithm
    ++testLength;
    ++testTailIndex;
    cy.tick(SHORT_DELAY_IN_MS);
    checkStepsState({
      length: testLength,
      headInd: testHeadIndex,
      tailInd: testTailIndex,
      algorithmType: "addToTail",
      algorithmStep: "second",
    });

    // check state when algorithm is finished
    cy.tick(SHORT_DELAY_IN_MS * 2);
    checkStepsState({
      length: testLength,
      headInd: testHeadIndex,
      tailInd: testTailIndex,
      algorithmType: "addToTail",
      algorithmStep: "finish",
    });

    cy.clock().invoke("restore");
  });

  it("list is displayed correctly at all steps of delete-from-head algorithm", function () {
    cy.clock();

    // delete item from head
    cy.get("@deleteFromHeadBtn").click();

    // check state at first step of algorithm
    checkStepsState({
      length: testLength,
      headInd: testHeadIndex,
      tailInd: testTailIndex,
      algorithmType: "delFromHead",
      algorithmStep: "first",
    });

    // check state when algorithm is finished
    --testLength;
    --testTailIndex;
    cy.tick(SHORT_DELAY_IN_MS);
    checkStepsState({
      length: testLength,
      headInd: testHeadIndex,
      tailInd: testTailIndex,
      algorithmType: "delFromHead",
      algorithmStep: "finish",
    });

    cy.clock().invoke("restore");
  });

  it("list is displayed correctly at all steps of delete-from-tail algorithm", function () {
    cy.clock();

    // delete item from tail
    cy.get("@deleteFromTailBtn").click();

    // check state at first step of algorithm
    checkStepsState({
      length: testLength,
      headInd: testHeadIndex,
      tailInd: testTailIndex,
      algorithmType: "delFromTail",
      algorithmStep: "first",
    });

    // check state when algorithm is finished
    --testLength;
    --testTailIndex;
    cy.tick(SHORT_DELAY_IN_MS);
    checkStepsState({
      length: testLength,
      headInd: testHeadIndex,
      tailInd: testTailIndex,
      algorithmType: "delFromTail",
      algorithmStep: "finish",
    });

    cy.clock().invoke("restore");
  });

  it("list is displayed correctly at all steps of add-by-index algorithm", function () {
    cy.clock();
    const testInputIndex = 2;
    const testInputText = "42";
    // one step for each index plus two steps for drawing the addition of a new element
    const maxStepCount = testInputIndex + 1 + 2;
    let currentStepCount = 0;

    // add item by index
    cy.get("@textInput").type(`${testInputText}`);
    cy.get("@indexInput").type(`${testInputIndex}`);
    cy.get("@addByIndexBtn").click();

    // check state at all steps of algorithm
    while (currentStepCount < maxStepCount) {
      cy.tick(SHORT_DELAY_IN_MS * currentStepCount);

      checkStepsForAddByIndex({
        length: testLength,
        textInputValue: testInputText,
        indexInputValue: testInputIndex,
        stepCount: currentStepCount + 1,
        maxStepNum: maxStepCount,
      });

      currentStepCount += 1;
    }

    cy.clock().invoke("restore");
  });

  it("list is displayed correctly at all steps of delete-by-index algorithm", function () {
    cy.clock();
    const testInputIndex = 3;

    // one step for each index plus two steps for drawing the addition of a new element
    const maxStepCount = testInputIndex + 1 + 2;
    let currentStepCount = 0;

    // add item by index
    cy.get("@indexInput").type(`${testInputIndex}`);
    cy.get("@deleteByIndexBtn").click();

    // check state at all steps of algorithm
    while (currentStepCount < maxStepCount) {
      cy.tick(SHORT_DELAY_IN_MS * currentStepCount);

      checkStepsForDeleteByIndex({
        length: testLength,
        textInputValue: "",
        indexInputValue: testInputIndex,
        stepCount: currentStepCount + 1,
        maxStepNum: maxStepCount,
      });

      currentStepCount += 1;
    }

    cy.clock().invoke("restore");
  });
});
