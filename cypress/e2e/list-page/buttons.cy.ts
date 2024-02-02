/// <reference types="cypress" />
// @ts-check

import {
  A_HREF_LIST,
  BUTTON_TEST_ID_ADD_BY_INDEX_BTN,
  BUTTON_TEST_ID_ADD_TO_HEAD_BTN,
  BUTTON_TEST_ID_ADD_TO_TAIL_BTN,
  BUTTON_TEST_ID_DEL_BY_INDEX_BTN,
  BUTTON_TEST_ID_DEL_FROM_HEAD_BTN,
  BUTTON_TEST_ID_DEL_FROM_TAIL_BTN,
} from "../../../src/constants/cy-selectors";
import { SHORT_DELAY_IN_MS } from "../../../src/constants/delays";
import {
  checkAddButton,
  checkAddByIndexButton,
  checkDeleteByIndexButton,
  checkDeleteFromListBtn,
} from "../utils/cy-check-button";

describe("The add-to-head button is displayed correctly", () => {
  checkAddButton({
    path: "/",
    hrefSelector: A_HREF_LIST,
    inputValue: "42",
    btnSelector: BUTTON_TEST_ID_ADD_TO_HEAD_BTN,
    delay: SHORT_DELAY_IN_MS / 2,
  });
});

describe("The add-to-tail button is displayed correctly", () => {
  checkAddButton({
    path: "/",
    hrefSelector: A_HREF_LIST,
    inputValue: "42",
    btnSelector: BUTTON_TEST_ID_ADD_TO_TAIL_BTN,
    delay: SHORT_DELAY_IN_MS / 2,
  });
});

describe("The add-by-index button is displayed correctly", () => {
  checkAddByIndexButton({
    path: "/",
    hrefSelector: A_HREF_LIST,
    inputValue: "2",
    btnSelector: BUTTON_TEST_ID_ADD_BY_INDEX_BTN,
    delay: SHORT_DELAY_IN_MS / 2,
  });
});

describe("The delete-by-index button is displayed correctly", () => {
  checkDeleteByIndexButton({
    path: "/",
    hrefSelector: A_HREF_LIST,
    inputValue: "2",
    btnSelector: BUTTON_TEST_ID_DEL_BY_INDEX_BTN,
    delay: SHORT_DELAY_IN_MS / 2,
  });
});

describe("The delete-from-head button is displayed correctly", () => {
  checkDeleteFromListBtn({
    path: "/",
    hrefSelector: A_HREF_LIST,
    btnSelector: BUTTON_TEST_ID_DEL_FROM_HEAD_BTN,
    delay: SHORT_DELAY_IN_MS / 2,
  });
});

describe("The delete-from-tail button is displayed correctly", () => {
  checkDeleteFromListBtn({
    path: "/",
    hrefSelector: A_HREF_LIST,
    btnSelector: BUTTON_TEST_ID_DEL_FROM_TAIL_BTN,
    delay: SHORT_DELAY_IN_MS / 2,
  });
});
