import React, { useEffect, useState } from "react";
import styles from "./sorting-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { TSetColumnsArrDispatch } from "../../types/common";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { Sorting } from "../../types/sorting";
import { Column } from "../ui/column/column";
import { bubbleSort, selectionSort } from "./utils";
import { getRandomNumArr } from "../../utils/common";

export const SortingPage: React.FC = () => {
  const [columnsArr, setColumnsArr] = useState<TSetColumnsArrDispatch>([]);
  const [sortingType, setSortingType] = useState<Sorting>(Sorting.Selection);
  const [direction, setDirection] = useState<Direction | null>(null);
  const [isLoader, setIsLoader] = useState<boolean>(false);

  const checkSortingTypeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    if (!(e.target instanceof HTMLInputElement)) {
      return;
    }

    const sorting =
      e.target.dataset.sorting === Sorting.Selection
        ? Sorting.Selection
        : Sorting.Bubble;

    setSortingType(sorting);
  };

  const ascendingDirectionHandler = async () => {
    setDirection(Direction.Ascending);
    setIsLoader(true);

    if (sortingType === Sorting.Bubble) {
      await bubbleSort(columnsArr, Direction.Ascending, setColumnsArr);
    } else {
      await selectionSort(columnsArr, Direction.Ascending, setColumnsArr);
    }
    
    setDirection(null);
    setIsLoader(false);
  };

  const descendingDirectionHandler = async () => {
    setDirection(Direction.Descending);
    setIsLoader(true);

    if (sortingType === Sorting.Bubble) {
      await bubbleSort(columnsArr, Direction.Descending, setColumnsArr);
    } else {
      await selectionSort(columnsArr, Direction.Descending, setColumnsArr);
    }
    
    setDirection(null);
    setIsLoader(false);
  };

  const getNewArrayHandler = () => {
    const newArr = getRandomNumArr();
    setColumnsArr(newArr);
  };

  useEffect(() => {
    const newArr = getRandomNumArr();
    setColumnsArr(newArr);
  }, []);

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.wrapper}>
        <div className={styles.radioWrapper}>
          <RadioInput
            label="Выбор"
            data-sorting={Sorting.Selection}
            checked={sortingType === Sorting.Selection}
            onChange={(e) => checkSortingTypeHandler(e)}
            disabled={isLoader}
          />
          <RadioInput
            label="Пузырёк"
            data-sorting={Sorting.Bubble}
            checked={sortingType === Sorting.Bubble}
            onChange={(e) => checkSortingTypeHandler(e)}
            disabled={isLoader}
          />
        </div>
        <div className={styles.directionWrapper}>
          <Button
            type={"button"}
            text={"По возрастанию"}
            linkedList={"big"}
            sorting={Direction.Ascending}
            data-direction={Direction.Ascending}
            onClick={ascendingDirectionHandler}
            isLoader={direction === Direction.Ascending && isLoader}
            disabled={direction === Direction.Descending && isLoader}
          />
          <Button
            type={"button"}
            text={"По убыванию"}
            linkedList={"big"}
            sorting={Direction.Descending}
            data-direction={Direction.Descending}
            onClick={descendingDirectionHandler}
            isLoader={direction === Direction.Descending && isLoader}
            disabled={direction === Direction.Ascending && isLoader}
          />
        </div>
        <Button
          type={"button"}
          text={"Новый массив"}
          linkedList={"big"}
          onClick={getNewArrayHandler}
          disabled={isLoader}
        />
      </div>
      <ul className={styles.list}>
        {columnsArr.length > 0 &&
          columnsArr.map((colomnObj, index) => {
            let state =
              colomnObj.state === "default"
                ? ElementStates.Default
                : undefined || colomnObj.state === "changing"
                ? ElementStates.Changing
                : undefined || colomnObj.state === "modified"
                ? ElementStates.Modified
                : undefined;

            return <Column index={colomnObj.index} key={index} state={state} />;
          })}
      </ul>
    </SolutionLayout>
  );
};
