describe("app works correctly with routes", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });

  it("should open mane-page by default", function () {
    cy.contains(/вдохновлено школами, в которых не учили алгоритмам/i);
  });

  it("should open string-page after recursion link click", function () {
    cy.get('a[href*="recursion"]').click();
    cy.contains(/строка/i);
  });

  it("should open fibonacci-page after fibonacci link click", function () {
    cy.get('a[href*="fibonacci"]').click();
    cy.contains(/фибоначчи/i);
  });

  it("should open sorting-page after sorting link click", function () {
    cy.get('a[href*="sorting"]').click();
    cy.contains(/сортировка/i);
  });

  it("should open stack-page after stack link click", function () {
    cy.get('a[href*="stack"]').click();
    cy.contains(/стек/i);
  });

  it("should open queue-page after queue link click", function () {
    cy.get('a[href*="queue"]').click();
    cy.contains(/очередь/i);
  });

  it("should open list-page after list link click", function () {
    cy.get('a[href*="list"]').click();
    cy.contains(/связный список/i);
  });
});
