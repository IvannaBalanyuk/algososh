import { HREF_ATTR_VALUES } from "../../../src/constants/href-attribute-values";

describe("app works correctly with routes", function () {
  beforeEach(function () {
    cy.visit("/");
  });

  it("should open mane-page by default", function () {
    cy.contains(/вдохновлено школами, в которых не учили алгоритмам/i);
  });

  it("should open string-page after recursion link click", function () {
    cy.get(`a[href*="${HREF_ATTR_VALUES.recursion}"]`).click();
    cy.contains(/строка/i);
  });

  it("should open fibonacci-page after fibonacci link click", function () {
    cy.get(`a[href*="${HREF_ATTR_VALUES.fibonacci}"]`).click();
    cy.contains(/фибоначчи/i);
  });

  it("should open sorting-page after sorting link click", function () {
    cy.get(`a[href*="${HREF_ATTR_VALUES.sorting}"]`).click();
    cy.contains(/сортировка/i);
  });

  it("should open stack-page after stack link click", function () {
    cy.get(`a[href*="${HREF_ATTR_VALUES.stack}"]`).click();
    cy.contains(/стек/i);
  });

  it("should open queue-page after queue link click", function () {
    cy.get(`a[href*="${HREF_ATTR_VALUES.queue}"]`).click();
    cy.contains(/очередь/i);
  });

  it("should open list-page after list link click", function () {
    cy.get(`a[href*="${HREF_ATTR_VALUES.list}"]`).click();
    cy.contains(/связный список/i);
  });
});
