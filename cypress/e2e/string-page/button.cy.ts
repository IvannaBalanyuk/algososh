/// <reference types="cypress" />
// @ts-check

import { A_HREF_RECURSION } from "../../../src/constants/cy-selectors";
import { SHORT_DELAY_IN_MS } from "../../../src/constants/delays";
import { checkAddButton } from "../utils/cy-check-button";

describe("The button is displayed correctly", () => {
  checkAddButton({
    path: "/",
    hrefSelector: A_HREF_RECURSION,
    inputValue: "test",
    delay: SHORT_DELAY_IN_MS
  });
});
