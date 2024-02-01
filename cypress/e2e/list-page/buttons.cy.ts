import { SHORT_DELAY_IN_MS } from "../../../src/constants/delays";
import { HREF_ATTR_VALUES } from "../../../src/constants/href-attribute-values";
import { TEST_IDS } from "../../../src/constants/test-ids";
import { checkAddButton, checkAddByIndexButton, checkDeleteByIndexButton, checkDeleteFromListBtn, checkDeleteOrClearBtn } from "../utils/button";

describe("The add-to-head button is displayed correctly", () => {
  checkAddButton({
    path: "/",
    href: HREF_ATTR_VALUES.list,
    inputValue: "42",
    btnTestId: TEST_IDS.addToHeadBtn,
    delay: SHORT_DELAY_IN_MS / 2
  });
});

describe("The add-to-tail button is displayed correctly", () => {
  checkAddButton({
    path: "/",
    href: HREF_ATTR_VALUES.list,
    inputValue: "42",
    btnTestId: TEST_IDS.addToTailBtn,
    delay: SHORT_DELAY_IN_MS / 2
  });
});

describe("The add-by-index button is displayed correctly", () => {
  checkAddByIndexButton({
    path: "/",
    href: HREF_ATTR_VALUES.list,
    inputValue: "2",
    btnTestId: TEST_IDS.addByIndexBtn,
    delay: SHORT_DELAY_IN_MS / 2
  });
});

describe("The delete-by-index button is displayed correctly", () => {
  checkDeleteByIndexButton({
    path: "/",
    href: HREF_ATTR_VALUES.list,
    inputValue: "2",
    btnTestId: TEST_IDS.deleteByIndexBtn,
    delay: SHORT_DELAY_IN_MS / 2
  });
});

describe("The delete-from-head button is displayed correctly", () => {
  checkDeleteFromListBtn({
    path: "/",
    href: HREF_ATTR_VALUES.list,
    btnTestId: TEST_IDS.deleteFromHeadBtn,
    delay: SHORT_DELAY_IN_MS / 2
  });
});

describe("The delete-from-tail button is displayed correctly", () => {
  checkDeleteFromListBtn({
    path: "/",
    href: HREF_ATTR_VALUES.list,
    btnTestId: TEST_IDS.deleteFromTailBtn,
    delay: SHORT_DELAY_IN_MS / 2
  });
});
