import { SHORT_DELAY_IN_MS } from "../../../src/constants/delays";
import { checkButtonForInput } from "../utils/button";

describe("the button is displayed correctly", () => {
  checkButtonForInput({
    path: "http://localhost:3000",
    href: "fibonacci",
    inputValue: "5",
    delay: SHORT_DELAY_IN_MS
  });
});
