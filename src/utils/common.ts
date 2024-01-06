import {
  TColumnObj,
  TSetColumnsArrDispatch,
  TSetLettersArrDispatch,
} from "../types/common";
import { ElementStates } from "../types/element-states";

export function swap<T>(arr: T[], i: number, j: number) {
  const tmp = arr[i];

  arr[i] = arr[j];
  arr[j] = tmp;
}

export function swapIndexes(arr: TColumnObj[], i: number, j: number) {
  const tmp = arr[i].index;

  arr[i].index = arr[j].index;
  arr[j].index = tmp;
}

export const setTimeoutPromise = async (delay: number) => {
  return new Promise((func) => setTimeout(func, delay));
};

export const setStateWithTimeout = async (
  setState: React.Dispatch<React.SetStateAction<any>>,
  delay: number,
  stateValue: TSetLettersArrDispatch | TSetColumnsArrDispatch
) => {
  await setTimeoutPromise(delay);
  setState([...stateValue]);
};

export const getRandomNum = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export const getRandomNumArr = () => {
  const arrLength = getRandomNum(3, 17);

  let randomArr: number[] = [];
  let result: TColumnObj[] = [];

  for (let i = 0; i <= arrLength; i++) {
    randomArr.push(getRandomNum(0, 100));
  }

  result = randomArr.map((item) => {
    return {
      index: item,
      state: ElementStates.Default,
    };
  });

  return result;
};

export const getRandomStrArr = (min: number, max: number) => {
  const arrLength = getRandomNum(min, max);
  let randomArr: string[] = [];

  for (let i = 0; i <= arrLength; i++) {
    randomArr.push(getRandomNum(0, 100).toString());
  }

  return randomArr;
};
