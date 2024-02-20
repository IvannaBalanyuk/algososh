import React, { useRef, useState } from "react";
import styles from "./sorting-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { Sorting } from "../../types/sorting";
import { Column } from "../ui/column/column";
import { getRandomNumArr } from "../../utils/common";
import { TStep } from "./types";
import {
  getBubbleSortSteps,
  getColumnState,
  getSelectionSortSteps,
} from "./utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const SortingPage: React.FC = () => {
  const randomArray = useRef<number[]>(getRandomNumArr());
  const intervalId = useRef<NodeJS.Timeout>();

  const [sortDirection, setSortDirection] = useState<Direction>();
  const [algorithmSteps, setAlgorithmSteps] = useState<TStep[]>([
    {
      currentArr: randomArray.current,
      sortedIndexes: [],
    },
  ]);
  const [sortingType, setSortingType] = useState<Sorting>(Sorting.Selection);
  const [currentAlgorithmStep, setCurrentAlgorithmStep] = useState<number>(0);

  const isAlgorithmInProgress =
    currentAlgorithmStep < algorithmSteps.length - 1;

  const generateNewArray = () => {
    randomArray.current = getRandomNumArr();
    setAlgorithmSteps([
      {
        currentArr: randomArray.current,
        sortedIndexes: [],
      },
    ]);
    setCurrentAlgorithmStep(0);
  };

  const makeSort = (currentDirection: Direction) => {
    const steps = (
      sortingType === Sorting.Selection
        ? getSelectionSortSteps
        : getBubbleSortSteps
    )(randomArray.current, currentDirection);

    setAlgorithmSteps(steps);
    setSortDirection(currentDirection);
    setCurrentAlgorithmStep(0);

    intervalId.current = setInterval(() => {
      if (steps.length) {
        setCurrentAlgorithmStep((currentStep) => {
          const nextStep = currentStep + 1;

          if (nextStep > steps.length - 1 && intervalId.current) {
            clearInterval(intervalId.current);
            randomArray.current = steps[steps.length - 1].currentArr;
            return currentStep;
          }

          return nextStep;
        });
      }
    }, SHORT_DELAY_IN_MS);
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.wrapper}>
        <div className={styles.radioWrapper}>
          <RadioInput
            label="Выбор"
            checked={sortingType === Sorting.Selection}
            onChange={() => setSortingType(Sorting.Selection)}
            disabled={isAlgorithmInProgress}
          />
          <RadioInput
            label="Пузырёк"
            checked={sortingType === Sorting.Bubble}
            onChange={() => setSortingType(Sorting.Bubble)}
            disabled={isAlgorithmInProgress}
          />
        </div>
        <div className={styles.directionWrapper}>
          <Button
            type={"button"}
            text={"По возрастанию"}
            linkedList={"big"}
            sorting={Direction.Ascending}
            onClick={() => makeSort(Direction.Ascending)}
            isLoader={
              sortDirection === Direction.Ascending && isAlgorithmInProgress
            }
            disabled={
              sortDirection === Direction.Descending && isAlgorithmInProgress
            }
          />
          <Button
            type={"button"}
            text={"По убыванию"}
            linkedList={"big"}
            sorting={Direction.Descending}
            onClick={() => makeSort(Direction.Descending)}
            isLoader={
              sortDirection === Direction.Descending && isAlgorithmInProgress
            }
            disabled={
              sortDirection === Direction.Ascending && isAlgorithmInProgress
            }
          />
        </div>
        <Button
          type={"button"}
          text={"Новый массив"}
          linkedList={"big"}
          onClick={generateNewArray}
          disabled={isAlgorithmInProgress}
        />
      </div>
      <ul className={styles.list}>
        {algorithmSteps.length > 0 &&
          algorithmSteps[currentAlgorithmStep].currentArr.map(
            (currentNumber, index) => (
              <Column
                index={currentNumber}
                key={currentNumber}
                state={getColumnState(
                  index,
                  algorithmSteps.length - 1,
                  currentAlgorithmStep,
                  algorithmSteps[currentAlgorithmStep]
                )}
              />
            )
          )}
      </ul>
    </SolutionLayout>
  );
};
