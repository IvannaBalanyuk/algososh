import { SHORT_DELAY_IN_MS } from "../../../src/constants/delays";

describe("the list of circles is displayed correctly", function () {
  const testValue = '4';
  const testSequence = [1, 1, 2, 3, 5];
  let stepsCount = 1;
  const defaultBorderStyle = '4px solid rgb(0, 50, 255)';

  function checkCirclesListState(count: number) {
    cy.get('ul').children().should('have.length', count);

    for (let i = 0; i < count; i++) {
      cy.get(`div[data-testid="circle-${i}"]`).children('div[class^=circle_circle]').should('have.css', 'border', defaultBorderStyle).contains(testSequence[i]);
    }
  }

  before(function () {
    cy.visit("http://localhost:3000");

    cy.get('a[href*="fibonacci"]').click();
    cy.get('input[placeholder*="Введите текст"]').type(testValue);
    cy.get('button[data-testid="button"]').click();
  });

  it("the list of circles is displayed correctly at all steps of the algorithm", function () {
    while (stepsCount <= testSequence.length) {
      cy.clock();
      cy.tick((stepsCount * SHORT_DELAY_IN_MS));
      checkCirclesListState(stepsCount);
      ++stepsCount;
      cy.clock().invoke('restore');
    }
  });
});