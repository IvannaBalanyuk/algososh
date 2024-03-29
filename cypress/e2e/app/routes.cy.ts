/// <reference types="cypress" />
// @ts-check

import {
  A_HREF_FIBONACCI,
  A_HREF_LIST,
  A_HREF_QUEUE,
  A_HREF_RECURSION,
  A_HREF_SORTING,
  A_HREF_STACK,
} from "../../../src/constants/cy-selectors";

describe("app works correctly with routes", function () {
  beforeEach(function () {
    cy.visit("/");
  });

  it("should open mane-page by default", function () {
    cy.contains(/вдохновлено школами, в которых не учили алгоритмам/i);
  });

  it("should open string-page after recursion link click", function () {
    cy.get(A_HREF_RECURSION).click();
    cy.contains(/строка/i);
  });

  it("should open fibonacci-page after fibonacci link click", function () {
    cy.get(A_HREF_FIBONACCI).click();
    cy.contains(/фибоначчи/i);
  });

  it("should open sorting-page after sorting link click", function () {
    cy.get(A_HREF_SORTING).click();
    cy.contains(/сортировка/i);
  });

  it("should open stack-page after stack link click", function () {
    cy.get(A_HREF_STACK).click();
    cy.contains(/стек/i);
  });

  it("should open queue-page after queue link click", function () {
    cy.get(A_HREF_QUEUE).click();
    cy.contains(/очередь/i);
  });

  it("should open list-page after list link click", function () {
    cy.get(A_HREF_LIST).click();
    cy.contains(/связный список/i);
  });
});
