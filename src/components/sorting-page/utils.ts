import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { TStep } from "./types";

export function getBubbleSortSteps(
  sourceArray: number[],
  direction: Direction = Direction.Ascending
): TStep[] {
  const steps: TStep[] = [];
  let isElementSwapped;
  let iterationCount = 0;

  do {
    isElementSwapped = false;
    for (let i = 0; i < sourceArray.length - 1 - iterationCount; i++) {
      if (
        direction === Direction.Ascending
          ? sourceArray[i] > sourceArray[i + 1]
          : sourceArray[i] < sourceArray[i + 1]
      ) {
        let temp = sourceArray[i];
        sourceArray[i] = sourceArray[i + 1];
        sourceArray[i + 1] = temp;
        isElementSwapped = true;
      }

      steps.push({
        currentArr: [...sourceArray],
        sortedIndexes: [...(steps[steps.length - 1]?.sortedIndexes || [])],
        aIndex: i,
        bIndex: i + 1,
      });
    }

    steps[steps.length - 1].sortedIndexes.push(
      sourceArray.length - ++iterationCount
    );
  } while (isElementSwapped);

  steps.push({
    currentArr: [...sourceArray],
    sortedIndexes: steps[steps.length - 1]?.sortedIndexes || [],
  });

  return steps;
}

export function getSelectionSortSteps(
  sourceArray: number[],
  direction: Direction = Direction.Ascending
): TStep[] {
  const steps: TStep[] = [];

  for (let i = 0; i < sourceArray.length - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < sourceArray.length; j++) {
      steps.push({
        currentArr: [...sourceArray],
        aIndex: i,
        bIndex: j,
        sortedIndexes: [...(steps[steps.length - 1]?.sortedIndexes || [])],
      });

      if (
        direction === Direction.Ascending
          ? sourceArray[minIndex] > sourceArray[j]
          : sourceArray[minIndex] < sourceArray[j]
      ) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      [sourceArray[i], sourceArray[minIndex]] = [
        sourceArray[minIndex],
        sourceArray[i],
      ];
    }

    steps[steps.length - 1].sortedIndexes.push(i);
  }

  steps.push({
    currentArr: [...sourceArray],
    sortedIndexes: steps[steps.length - 1]?.sortedIndexes || [],
  });

  return steps;
}

export function getColumnState(
  index: number,
  maxIndex: number,
  currentStepIndex: number,
  currentStep: TStep
): ElementStates {
  if ([currentStep.aIndex, currentStep.bIndex].includes(index)) {
    return ElementStates.Changing;
  }

  if (
    currentStep.sortedIndexes.includes(index) ||
    (currentStepIndex === maxIndex && maxIndex > 0)
  ) {
    return ElementStates.Modified;
  }

  return ElementStates.Default;
}
