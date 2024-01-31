import { SHORT_DELAY_IN_MS } from "../../../src/constants/delays";
import { checkButtonForInput } from "../utils/button";

describe("The button is displayed correctly", () => {
  checkButtonForInput({
    path: "http://localhost:3000",
    href: "recursion",
    inputValue: "test",
    delay: SHORT_DELAY_IN_MS
  });
});
