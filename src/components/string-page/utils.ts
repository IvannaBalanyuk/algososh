import { ElementStates } from "../../types/element-states";

export function getStringReversalSteps(sourceStr: string): string[][] {
  const sourceStrLetters = sourceStr.split("");
  const steps: string[][] = [[...sourceStrLetters]];

  if (sourceStr.length <= 1) {
    return [[...sourceStrLetters]];
  }

  const maxIterationCount = Math.ceil((sourceStr.length - 1) / 2);

  for (let leftIndex = 0; leftIndex < maxIterationCount; ++leftIndex) {
    const rightIndex = sourceStr.length - 1 - leftIndex;

    sourceStrLetters[rightIndex] = sourceStr[leftIndex];
    sourceStrLetters[leftIndex] = sourceStr[rightIndex];
    steps.push([...sourceStrLetters]);
  }

  return steps;
}

export function getLetterState(
  index: number,
  maxIndex: number,
  currentStep: number
): ElementStates {
  const maxStepCount = Math.ceil(maxIndex / 2);
  const isFinished = currentStep === maxStepCount ? true : false;

  if (isFinished) {
    return ElementStates.Default;
  }

  if (index < currentStep || index > maxIndex - currentStep) {
    return ElementStates.Modified;
  }

  if (index === currentStep || index === maxIndex - currentStep) {
    return ElementStates.Changing;
  }

  return ElementStates.Default;
}
