/// <reference types="cypress" />
// @ts-check

import {
  A_HREF_QUEUE,
  BUTTON_TEST_ID_ADD_BTN,
  BUTTON_TEST_ID_CLEAR_BTN,
  BUTTON_TEST_ID_DEL_BTN,
} from "../../../src/constants/cy-selectors";
import { SHORT_DELAY_IN_MS } from "../../../src/constants/delays";
import {
  checkAddButton,
  checkDeleteOrClearBtn,
} from "../utils/cy-check-button";

describe("The add button is displayed correctly", () => {
  checkAddButton({
    path: "/",
    hrefSelector: A_HREF_QUEUE,
    inputValue: "5",
    btnSelector: BUTTON_TEST_ID_ADD_BTN,
    delay: SHORT_DELAY_IN_MS / 2,
  });
});

describe("The delete button is displayed correctly", () => {
  checkDeleteOrClearBtn({
    path: "/",
    hrefSelector: A_HREF_QUEUE,
    btnSelector: BUTTON_TEST_ID_DEL_BTN,
    delay: SHORT_DELAY_IN_MS / 2,
  });
});

describe("The clear button is displayed correctly", () => {
  checkDeleteOrClearBtn({
    path: "/",
    hrefSelector: A_HREF_QUEUE,
    btnSelector: BUTTON_TEST_ID_CLEAR_BTN,
    delay: SHORT_DELAY_IN_MS / 2,
  });
});
