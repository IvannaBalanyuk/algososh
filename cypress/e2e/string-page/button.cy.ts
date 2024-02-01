import { SHORT_DELAY_IN_MS } from "../../../src/constants/delays";
import { HREF_ATTR_VALUES } from "../../../src/constants/href-attribute-values";
import { checkAddButton } from "../utils/button";

describe("The button is displayed correctly", () => {
  checkAddButton({
    path: "/",
    href: HREF_ATTR_VALUES.recursion,
    inputValue: "test",
    delay: SHORT_DELAY_IN_MS
  });
});
