import { SHORT_DELAY_IN_MS } from "../../../src/constants/delays";
import { HREF_ATTR_VALUES } from "../../../src/constants/href-attribute-values";
import { TEST_IDS } from "../../../src/constants/test-ids";
import { checkAddButton, checkDeleteOrClearBtn } from "../utils/button";

describe("The add button is displayed correctly", () => {
  checkAddButton({
    path: "/",
    href: HREF_ATTR_VALUES.stack,
    inputValue: "5",
    btnTestId: TEST_IDS.addButton,
    delay: SHORT_DELAY_IN_MS / 2
  });
});

describe("The delete button is displayed correctly", () => {
  checkDeleteOrClearBtn({
    path: "/",
    href: HREF_ATTR_VALUES.stack,
    btnTestId: TEST_IDS.deleteButton,
    delay: SHORT_DELAY_IN_MS / 2
  });
});

describe("The clear button is displayed correctly", () => {
  checkDeleteOrClearBtn({
    path: "/",
    href: HREF_ATTR_VALUES.stack,
    btnTestId: TEST_IDS.clearButton,
    delay: SHORT_DELAY_IN_MS / 2
  });
});
