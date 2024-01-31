import { DELAY_IN_MS } from "../../../src/constants/delays";

describe("the list of circles is displayed correctly", function () {
  const testValue = "iron";
  const testStepsArr = [
    ["i", "r", "o", "n"],
    ["n", "r", "o", "i"],
    ["n", "o", "r", "i"],
  ];
  
  let stepsCount = 0;

  const defaultBorderStyle = "4px solid rgb(0, 50, 255)";
  const changingBorderStyle = "4px solid rgb(210, 82, 225)";
  const modifiedBorderStyle = "4px solid rgb(127, 224, 81)";

  function getBorderStyle(index: number, maxIndex: number, currentStep: number): string {
    const maxStepCount = Math.ceil(maxIndex / 2);
    if (currentStep === maxStepCount) return defaultBorderStyle;

    if (index < currentStep || index > maxIndex - currentStep) return modifiedBorderStyle;

    if (index === currentStep || index === maxIndex - currentStep) return changingBorderStyle;

    return defaultBorderStyle;
  }

  function checkCirclesListState(listLength: number, stepsCount: number) {
    cy.get("ul").children().should("have.length", testValue.length);

    for (let i = 0; i < listLength; i++) {
      const borderStyle = getBorderStyle(i, listLength - 1, stepsCount);
      cy.get(`div[data-testid="circle-${i}"]`)
        .children("div[class^=circle_circle]")
        .should("have.css", "border", borderStyle);
    }
  }

  before(function () {
    cy.visit("http://localhost:3000");

    cy.get('a[href*="recursion"]').click();
    cy.get('input[placeholder*="Введите текст"]').type(testValue);
    cy.get('button[data-testid="button"]').click();
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
