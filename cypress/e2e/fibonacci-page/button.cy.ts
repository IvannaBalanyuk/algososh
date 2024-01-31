import { checkButton } from "../utils/button";

describe("the button is displayed correctly", () => {
  checkButton("http://localhost:3000", "fibonacci", "5");
});
