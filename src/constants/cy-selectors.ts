import { HREF_ATTR_VALUES } from "./href-attribute-values";
import { ENTER_INDEX, ENTER_TEXT } from "./placeholders";
import { TEST_IDS } from "./test-ids";

export const DIV_CLASS_CIRCLE_CIRCLE = "div[class^=circle_circle]";
export const IMG_CLASS_LOADER_ICON = "img[class^=button_loader_icon]";
export const INPUT_PLACEHOLDER_ENTER_TEXT = `input[placeholder*="${ENTER_TEXT}"]`;
export const INPUT_PLACEHOLDER_ENTER_INDEX = `input[placeholder*="${ENTER_INDEX}"]`;
export const BUTTON_TEST_ID_BTN = `button[data-testid="${TEST_IDS.button}"]`;
export const BUTTON_TEST_ID_ADD_BTN = `button[data-testid="${TEST_IDS.addButton}"]`;
export const BUTTON_TEST_ID_ADD_TO_HEAD_BTN = `button[data-testid="${TEST_IDS.addToHeadBtn}"]`;
export const BUTTON_TEST_ID_ADD_TO_TAIL_BTN = `button[data-testid="${TEST_IDS.addToTailBtn}"]`;
export const BUTTON_TEST_ID_ADD_BY_INDEX_BTN = `button[data-testid="${TEST_IDS.addByIndexBtn}"]`;
export const BUTTON_TEST_ID_DEL_BTN = `button[data-testid="${TEST_IDS.delButton}"]`;
export const BUTTON_TEST_ID_DEL_FROM_HEAD_BTN = `button[data-testid="${TEST_IDS.delFromHeadBtn}"]`;
export const BUTTON_TEST_ID_DEL_FROM_TAIL_BTN = `button[data-testid="${TEST_IDS.delFromTailBtn}"]`;
export const BUTTON_TEST_ID_DEL_BY_INDEX_BTN = `button[data-testid="${TEST_IDS.delByIndexBtn}"]`;
export const BUTTON_TEST_ID_CLEAR_BTN = `button[data-testid="${TEST_IDS.clearButton}"]`;
export const P_TEST_ID_LETTER = `p[data-testid="${TEST_IDS.letter}"]`;
export const A_HREF_RECURSION = `a[href*="${HREF_ATTR_VALUES.recursion}"]`;
export const A_HREF_FIBONACCI = `a[href*="${HREF_ATTR_VALUES.fibonacci}"]`;
export const A_HREF_SORTING = `a[href*="${HREF_ATTR_VALUES.sorting}"]`;
export const A_HREF_STACK = `a[href*="${HREF_ATTR_VALUES.stack}"]`;
export const A_HREF_QUEUE = `a[href*="${HREF_ATTR_VALUES.queue}"]`;
export const A_HREF_LIST = `a[href*="${HREF_ATTR_VALUES.list}"]`;
