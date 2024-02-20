import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import {
  getBubbleSortSteps,
  getSelectionSortSteps,
  getColumnState,
} from "./utils";

describe("Функция получения массива шагов сортировки пузырьком getBubbleSortSteps", () => {
  test("корректно сортирует массив с несколькими элементами по возрастанию", () => {
    expect(getBubbleSortSteps([73, 42, 13], Direction.Ascending)).toEqual([
      {
        aIndex: 0,
        bIndex: 1,
        currentArr: [42, 73, 13],
        sortedIndexes: [],
      },
      {
        aIndex: 1,
        bIndex: 2,
        currentArr: [42, 13, 73],
        sortedIndexes: [2],
      },
      {
        aIndex: 0,
        bIndex: 1,
        currentArr: [13, 42, 73],
        sortedIndexes: [2, 1, 0],
      },
      {
        currentArr: [13, 42, 73],
        sortedIndexes: [2, 1, 0],
      },
    ]);
  });

  test("корректно сортирует массив с несколькими элементами по убыванию", () => {
    expect(getBubbleSortSteps([13, 42, 73], Direction.Descending)).toEqual([
      {
        aIndex: 0,
        bIndex: 1,
        currentArr: [42, 13, 73],
        sortedIndexes: [],
      },
      {
        aIndex: 1,
        bIndex: 2,
        currentArr: [42, 73, 13],
        sortedIndexes: [2],
      },
      {
        aIndex: 0,
        bIndex: 1,
        currentArr: [73, 42, 13],
        sortedIndexes: [2, 1, 0],
      },
      {
        currentArr: [73, 42, 13],
        sortedIndexes: [2, 1, 0],
      },
    ]);
  });

  test("корректно сортирует пустой массив", () => {
    expect(getBubbleSortSteps([])).toEqual([
      {
        currentArr: [],
        sortedIndexes: [],
      },
    ]);
  });

  test("корректно сортирует массив из одного элемента", () => {
    expect(getBubbleSortSteps([42])).toEqual([
      {
        currentArr: [42],
        sortedIndexes: [],
      },
    ]);
  });
});

describe("Функция получения массива шагов сортировки выбором getSelectionSortSteps", () => {
  test("корректно сортирует массив с несколькими элементами по возрастанию", () => {
    expect(getSelectionSortSteps([73, 42, 13], Direction.Ascending)).toEqual([
      {
        aIndex: 0,
        bIndex: 1,
        currentArr: [73, 42, 13],
        sortedIndexes: [],
      },
      {
        aIndex: 0,
        bIndex: 2,
        currentArr: [73, 42, 13],
        sortedIndexes: [0],
      },
      {
        aIndex: 1,
        bIndex: 2,
        currentArr: [13, 42, 73],
        sortedIndexes: [0, 1],
      },
      {
        currentArr: [13, 42, 73],
        sortedIndexes: [0, 1],
      },
    ]);
  });

  test("корректно сортирует массив с несколькими элементами по убыванию", () => {
    expect(getSelectionSortSteps([13, 42, 73], Direction.Descending)).toEqual([
      {
        aIndex: 0,
        bIndex: 1,
        currentArr: [13, 42, 73],
        sortedIndexes: [],
      },
      {
        aIndex: 0,
        bIndex: 2,
        currentArr: [13, 42, 73],
        sortedIndexes: [0],
      },
      {
        aIndex: 1,
        bIndex: 2,
        currentArr: [73, 42, 13],
        sortedIndexes: [0, 1],
      },
      {
        currentArr: [73, 42, 13],
        sortedIndexes: [0, 1],
      },
    ]);
  });

  test("корректно сортирует пустой массив", () => {
    expect(getSelectionSortSteps([])).toEqual([
      {
        currentArr: [],
        sortedIndexes: [],
      },
    ]);
  });

  test("корректно сортирует массив из одного элемента", () => {
    expect(getSelectionSortSteps([42])).toEqual([
      {
        currentArr: [42],
        sortedIndexes: [],
      },
    ]);
  });
});

describe("Функция получения состояния столбца getColumnState", () => {
  let algorithmSteps = [
    {
      aIndex: 0,
      bIndex: 1,
      currentArr: [42, 73, 13],
      sortedIndexes: [],
    },
    {
      aIndex: 1,
      bIndex: 2,
      currentArr: [42, 13, 73],
      sortedIndexes: [2],
    },
    {
      aIndex: 0,
      bIndex: 1,
      currentArr: [13, 42, 73],
      sortedIndexes: [2, 1, 0],
    },
    {
      currentArr: [13, 42, 73],
      sortedIndexes: [2, 1, 0],
    },
  ];

  test("возвращает default для неотсортированных элементов", () => {
    expect(
      getColumnState(
        0,
        algorithmSteps.length - 1,
        1,
        algorithmSteps[1]
      )
    ).toBe(ElementStates.Default);
  });

  test("возвращает modified для отсортированных элементов", () => {
    expect(getColumnState(
      2,
      algorithmSteps.length - 1,
      3,
      algorithmSteps[3]
    )).toBe(ElementStates.Modified);
  });

  test("возвращает changing для сопоставляемых элементов", () => {
    expect(getColumnState(
      1,
      algorithmSteps.length - 1,
      1,
      algorithmSteps[1]
    )).toBe(ElementStates.Changing);
  });
});
