describe("the list of circles is displayed correctly", function () {
  const testStr = 'iron';
  const defaultBorderStyle = '4px solid rgb(0, 50, 255)';
  const changingBorderStyle = '4px solid rgb(210, 82, 225)';
  const modifiedBorderStyle = '4px solid rgb(127, 224, 81)';

  before(function () {
    cy.clock();
    cy.visit("http://localhost:3000");

    cy.get('a[href*="recursion"]').click();
    cy.get('input[placeholder*="Введите текст"]').type(testStr);
    cy.get('button[data-testid="button"]').click();

    cy.get('ul').children().as("circles");
    cy.get('div[data-testid="circle-0"]').children('div[class^=circle_circle]').as('firstCircle');
    cy.get('div[data-testid="circle-1"]').children('div[c/.lass^=circle_circle]').as('secondCircle');
    cy.get('div[data-testid="circle-2"]').children('div[class^=circle_circle]').as('thirdCircle');
    cy.get('div[data-testid="circle-3"]').children('div[class^=circle_circle]').as('lastCircle');
  });

  it("the list of circles is displayed correctly at all steps of the algorithm", function () {
    cy.tick(500);
    cy.get('@circles').should('have.length', testStr.length);

    cy.get('@firstCircle').should('have.css', 'border', changingBorderStyle);
    cy.get('@firstCircle').contains(testStr[0]);

    cy.get('@secondCircle').should('have.css', 'border', defaultBorderStyle);
    cy.get('@secondCircle').contains(testStr[1]);

    cy.get('@thirdCircle').should('have.css', 'border', defaultBorderStyle);
    cy.get('@thirdCircle').contains(testStr[2]);

    cy.get('@lastCircle').should('have.css', 'border', changingBorderStyle);
    cy.get('@lastCircle').contains(testStr[3]);

    cy.tick(1000);
    cy.get('@circles').should('have.length', testStr.length);

    cy.get('@firstCircle').should('have.css', 'border', modifiedBorderStyle);
    cy.get('@firstCircle').contains(testStr[3]);

    cy.get('@secondCircle').should('have.css', 'border', changingBorderStyle);
    cy.get('@secondCircle').contains(testStr[1]);

    cy.get('@thirdCircle').should('have.css', 'border', changingBorderStyle);
    cy.get('@thirdCircle').contains(testStr[2]);

    cy.get('@lastCircle').should('have.css', 'border', modifiedBorderStyle);
    cy.get('@lastCircle').contains(testStr[0]);

    cy.tick(1500);
    cy.get('@circles').should('have.length', testStr.length);

    cy.get('@firstCircle').should('have.css', 'border', defaultBorderStyle);
    cy.get('@firstCircle').contains(testStr[3]);

    cy.get('@secondCircle').should('have.css', 'border', defaultBorderStyle);
    cy.get('@secondCircle').contains(testStr[2]);

    cy.get('@thirdCircle').should('have.css', 'border', defaultBorderStyle);
    cy.get('@thirdCircle').contains(testStr[1]);

    cy.get('@lastCircle').should('have.css', 'border', defaultBorderStyle);
    cy.get('@lastCircle').contains(testStr[0]);
  });
});
