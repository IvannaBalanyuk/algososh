import { SHORT_DELAY_IN_MS } from "../../../src/constants/delays";
import { HREF_ATTR_VALUES } from "../../../src/constants/href-attribute-values";
import { checkButtonForInput } from "../utils/button";

describe("The button is displayed correctly", () => {
  checkButtonForInput({
    path: "/",
    href: HREF_ATTR_VALUES.recursion,
    inputValue: "test",
    delay: SHORT_DELAY_IN_MS
  });
});
