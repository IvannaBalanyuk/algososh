import { SHORT_DELAY_IN_MS } from "../../../src/constants/delays";
import { checkButtonForInput, checkDeleteOrClearBtn } from "../utils/button";

describe("The add button is displayed correctly", () => {
  checkButtonForInput({
    path: "http://localhost:3000",
    href: "stack",
    inputValue: "5",
    btnTestId: "addButton",
    delay: SHORT_DELAY_IN_MS / 2
  });
});

describe("The delete button is displayed correctly", () => {
  checkDeleteOrClearBtn({
    path: "http://localhost:3000",
    href: "stack",
    btnTestId: "deleteButton",
    delay: SHORT_DELAY_IN_MS / 2
  });
});

describe("The clear button is displayed correctly", () => {
  checkDeleteOrClearBtn({
    path: "http://localhost:3000",
    href: "stack",
    btnTestId: "clearButton",
    delay: SHORT_DELAY_IN_MS / 2
  });
});
