/// <reference types="cypress" />
// @ts-check

import {
  A_HREF_QUEUE,
  BUTTON_TEST_ID_ADD_BTN,
  BUTTON_TEST_ID_BTN,
  IMG_CLASS_LOADER_ICON,
  INPUT_PLACEHOLDER_ENTER_INDEX,
  INPUT_PLACEHOLDER_ENTER_TEXT,
  P_TEST_ID_LETTER,
} from "../../../src/constants/cy-selectors";
import { TEST_IDS } from "../../../src/constants/test-ids";

interface TParams {
  path: string;
  hrefSelector: string;
  btnSelector?: string;
  delay: number;
}

interface TParamsForCheckAddBtn extends TParams {
  textInputSelector?: string;
  inputValue: string;
}

interface TParamsForCheckActByIndexBtn extends TParamsForCheckAddBtn {
  indexInputSelector?: string;
}

export function checkAddButton({
  path,
  hrefSelector,
  textInputSelector = INPUT_PLACEHOLDER_ENTER_TEXT,
  inputValue,
  btnSelector = BUTTON_TEST_ID_BTN,
  delay,
}: TParamsForCheckAddBtn) {
  beforeEach(function () {
    cy.visit(path);
    cy.get(hrefSelector).click();
    cy.get(textInputSelector).as("input");
    cy.get(btnSelector).as("button");
  });

  it("the button is disabled when the input is empty", function () {
    cy.get("@input").should("be.empty");
    cy.get("@button").should("be.disabled");
  });

  it("the button is not disabled when the input is not empty", function () {
    cy.get("@input").type(inputValue);
    cy.get("@button").should("not.be.disabled");
  });

  it("the button has a loader when the algorithm in progress", function () {
    cy.clock();
    cy.get("@input").type(inputValue);
    cy.get("@button").click();
    cy.tick(delay);
    cy.get("@button").children(IMG_CLASS_LOADER_ICON);
    cy.clock().invoke("restore");
  });
}

export function checkAddByIndexButton({
  path,
  hrefSelector,
  textInputSelector = INPUT_PLACEHOLDER_ENTER_TEXT,
  indexInputSelector = INPUT_PLACEHOLDER_ENTER_INDEX,
  inputValue,
  btnSelector = BUTTON_TEST_ID_BTN,
  delay,
}: TParamsForCheckActByIndexBtn) {
  beforeEach(function () {
    cy.visit(path);
    cy.get(hrefSelector).click();
    cy.get(textInputSelector).as("textInput");
    cy.get(indexInputSelector).as("indexInput");
    cy.get(btnSelector).as("button");
  });

  it("the button is disabled when the inputs is empty", function () {
    cy.get("@textInput").should("be.empty");
    cy.get("@indexInput").should("be.empty");
    cy.get("@button").should("be.disabled");
  });

  it("the button is not disabled when the inputs is not empty", function () {
    cy.get("@textInput").type(inputValue);
    cy.get("@indexInput").type(inputValue);
    cy.get("@button").should("not.be.disabled");
  });

  it("the button has a loader when the algorithm in progress", function () {
    cy.clock();
    cy.get("@textInput").type(inputValue);
    cy.get("@indexInput").type(inputValue);
    cy.get("@button").click();
    cy.tick(delay);
    cy.get("@button").children(IMG_CLASS_LOADER_ICON);
    cy.clock().invoke("restore");
  });
}

export function checkDeleteByIndexButton({
  path,
  hrefSelector,
  indexInputSelector = INPUT_PLACEHOLDER_ENTER_INDEX,
  inputValue,
  btnSelector = TEST_IDS.button,
  delay,
}: TParamsForCheckActByIndexBtn) {
  beforeEach(function () {
    cy.visit(path);
    cy.get(hrefSelector).click();
    cy.get(indexInputSelector).as("indexInput");
    cy.get(btnSelector).as("button");
  });

  it("the button is disabled when the input is empty", function () {
    cy.get("@indexInput").should("be.empty");
    cy.get("@button").should("be.disabled");
  });

  it("the button is not disabled when the input is not empty", function () {
    cy.get("@indexInput").type(inputValue);
    cy.get("@button").should("not.be.disabled");
  });

  it("the button has a loader when the algorithm in progress", function () {
    cy.clock();
    cy.get("@indexInput").type(inputValue);
    cy.get("@button").click();
    cy.tick(delay);
    cy.get("@button").children(IMG_CLASS_LOADER_ICON);
    cy.clock().invoke("restore");
  });
}

export function checkDeleteOrClearBtn({
  path,
  hrefSelector,
  btnSelector = TEST_IDS.button,
  delay,
}: TParams) {
  beforeEach(function () {
    cy.visit(path);
    cy.get(hrefSelector).click();
    cy.get(INPUT_PLACEHOLDER_ENTER_TEXT).as("input");
    cy.get(btnSelector).as("targetButton");
    cy.get(BUTTON_TEST_ID_ADD_BTN).as("addButton");
  });

  it("the button is disabled when the list is empty", function () {
    if (hrefSelector === A_HREF_QUEUE) {
      cy.get(P_TEST_ID_LETTER).should("be.empty");
    } else {
      cy.get("ul").children().should("have.length", 0);
    }
    cy.get("@targetButton").should("be.disabled");
  });

  it("the button is not disabled when the list is not empty", function () {
    cy.get("@input").type("42");
    cy.get("@addButton").click();
    cy.get("@targetButton").should("not.be.disabled");
  });

  it("the button has a loader when the algorithm in progress", function () {
    cy.get("@input").type("42");
    cy.get("@addButton").click();

    cy.clock();

    cy.get("@targetButton").click();
    cy.tick(delay);
    cy.get("@targetButton").children(IMG_CLASS_LOADER_ICON);

    cy.clock().invoke("restore");
  });
}

export function checkDeleteFromListBtn({
  path,
  hrefSelector,
  btnSelector = TEST_IDS.button,
  delay,
}: TParams) {
  beforeEach(function () {
    cy.visit(path);
    cy.get(hrefSelector).click();
    cy.get(btnSelector).as("targetButton");
  });

  it("the button is not disabled when the list is not empty and is disabled when the list is empty", function () {
    let currentCount = 4;

    cy.get("ul").children().should("have.length", currentCount);
    cy.get("@targetButton").should("not.be.disabled");

    while (currentCount > 0) {
      cy.get("@targetButton").click();
      --currentCount;
    }

    cy.get("ul").children().should("have.length", 0);
    cy.get("@targetButton").should("be.disabled");
  });

  it("the button has a loader when the algorithm in progress", function () {
    cy.clock();

    cy.get("@targetButton").click();
    cy.tick(delay);
    cy.get("@targetButton").children(IMG_CLASS_LOADER_ICON);

    cy.clock().invoke("restore");
  });
}
