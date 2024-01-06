import { TColumnObj, TSetColumnsArrDispatch } from "../../types/common";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { setStateWithTimeout, swapIndexes } from "../../utils/common";

export async function bubbleSort(
  arr: TColumnObj[] | null,
  direction: Direction,
  setColumnsArr: React.Dispatch<React.SetStateAction<TSetColumnsArrDispatch>>
) {
  if (arr === null || arr.length === 0) {
    return;
  }

  let sortedArr = arr.map((item) => item);
  const { length } = sortedArr;

  for (let i = 0; i < length - 1; i++) {
    for (let j = 0; j < length - 1 - i; j++) {
      let prev;
      const curr = sortedArr[j];
      const next = sortedArr[j + 1];

      if (j !== 0) {
        prev = sortedArr[j - 1];
        prev.state = ElementStates.Default;
      }
      curr.state = ElementStates.Changing;
      next.state = ElementStates.Changing;
      await setStateWithTimeout(setColumnsArr, 500, sortedArr);

      const requirement =
        direction === Direction.Ascending
          ? next.index < curr.index
          : next.index > curr.index;

      if (requirement) {
        swapIndexes(sortedArr, j, j + 1);
        await setStateWithTimeout(setColumnsArr, 500, sortedArr);
      }
    }

    const sortedItem = sortedArr[length - 1 - i];
    const prevItem = sortedArr[length - 2 - i];

    prevItem.state = ElementStates.Default;
    sortedItem.state = ElementStates.Modified;
    await setStateWithTimeout(setColumnsArr, 500, sortedArr);
  }

  sortedArr.forEach((item) => (item.state = ElementStates.Default));
  setColumnsArr([...sortedArr]);
}

export async function selectionSort(
  arr: TColumnObj[] | null,
  direction: Direction,
  setColumnsArr: React.Dispatch<React.SetStateAction<TSetColumnsArrDispatch>>
) {
  if (arr === null || arr.length === 0) {
    return;
  }

  let sortedArr = arr.map((item) => item);
  const { length } = sortedArr;

  for (let i = 0; i < length - 1; i++) {
    let targetIndex = i;

    sortedArr[targetIndex].state = ElementStates.Changing;
    await setStateWithTimeout(setColumnsArr, 500, sortedArr);

    for (let j = i + 1; j < length; j++) {
      const curr = sortedArr[j];

      curr.state = ElementStates.Changing;
      await setStateWithTimeout(setColumnsArr, 500, sortedArr);

      const requirement =
        direction === Direction.Ascending
          ? curr.index <= sortedArr[targetIndex].index
          : curr.index >= sortedArr[targetIndex].index;

      if (requirement) {
        targetIndex = j;
      }
      curr.state = ElementStates.Default;
      await setStateWithTimeout(setColumnsArr, 500, sortedArr);
    }
    
    swapIndexes(sortedArr, i, targetIndex);
    sortedArr[i].state = ElementStates.Modified;
    await setStateWithTimeout(setColumnsArr, 500, sortedArr);
  }

  sortedArr.forEach((item) => (item.state = ElementStates.Default));
  setColumnsArr([...sortedArr]);
}
