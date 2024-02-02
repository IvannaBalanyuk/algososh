import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import styles from "./list-page.module.css";
import { Action } from "../../types/action";
import useForm from "../../hooks/useForm";
import { LinkedList } from "./utils";
import { getRandomStrArr, setTimeoutPromise } from "../../utils/common";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { TEST_IDS } from "../../constants/test-ids";
import { ENTER_INDEX, ENTER_TEXT } from "../../constants/placeholders";

type TListState = {
  items: string[];
  topIndex: number | null;
  bottomIndex: number | null;
  modifiedIndex: number | null;
  changingIndex: number | null;
};

export const ListPage: React.FC = () => {
  const [listState, setListState] = useState<TListState>({
    items: [],
    topIndex: null,
    bottomIndex: null,
    modifiedIndex: null,
    changingIndex: null,
  });
  const [action, setAction] = useState<Action | null>(null);
  const [isLoader, setIsLoader] = useState<boolean>(false);

  const { values, handleChange, setValues } = useForm({
    string: "",
    index: null,
  });

  const linkedList = new LinkedList(listState.items);

  useEffect(() => {
    setListState({
      ...listState,
      items: getRandomStrArr(3, 3),
    });
  }, []);

  const addToHeadHandler = async () => {
    if (values.string.length === 0) return;
    setAction(Action.AddToHead);
    setIsLoader(true);

    setListState({
      ...listState,
      topIndex: 0,
    });
    await setTimeoutPromise(SHORT_DELAY_IN_MS);

    setListState({
      ...listState,
      topIndex: null,
    });
    linkedList.addToHead(values.string);
    const newItems = linkedList.turnIntoArr();
    setListState({
      ...listState,
      items: newItems,
      modifiedIndex: 0,
    });
    await setTimeoutPromise(SHORT_DELAY_IN_MS);

    setListState({
      ...listState,
      items: newItems,
      modifiedIndex: null,
    });
    setValues({
      ...values,
      string: "",
    });

    setIsLoader(false);
    setAction(null);
  };

  const addToTailHandler = async () => {
    if (values.string && values.string.length === 0) return;
    setAction(Action.AddToTail);
    setIsLoader(true);

    setListState({
      ...listState,
      topIndex: linkedList.getSize() - 1,
    });
    await setTimeoutPromise(SHORT_DELAY_IN_MS);

    linkedList.addToTail(values.string);
    const newItems = linkedList.turnIntoArr();
    setListState({
      ...listState,
      items: newItems,
      topIndex: null,
      modifiedIndex: linkedList.getSize() - 1,
    });
    await setTimeoutPromise(SHORT_DELAY_IN_MS);

    setListState({
      ...listState,
      items: newItems,
      modifiedIndex: null,
    });
    setValues({
      ...values,
      string: "",
    });

    setIsLoader(false);
    setAction(null);
  };

  const delFromHeadHandler = async () => {
    setAction(Action.DeleteFromHead);
    setIsLoader(true);

    setListState({
      ...listState,
      bottomIndex: 0,
    });
    await setTimeoutPromise(SHORT_DELAY_IN_MS);

    linkedList.delFromHead();
    setListState({
      ...listState,
      bottomIndex: null,
      items: linkedList.turnIntoArr(),
    });

    setIsLoader(false);
    setAction(null);
  };

  const delFromTailHandler = async () => {
    setAction(Action.DeleteFromTail);
    setIsLoader(true);

    setListState({
      ...listState,
      bottomIndex: linkedList.getSize() - 1,
    });
    await setTimeoutPromise(SHORT_DELAY_IN_MS);

    linkedList.delFromTail();
    setListState({
      ...listState,
      items: linkedList.turnIntoArr(),
      bottomIndex: null,
    });

    setIsLoader(false);
    setAction(null);
  };

  const addByIndexHandler = async () => {
    if (values.index === null || values.index < 0) return;

    setAction(Action.AddByIndex);
    setIsLoader(true);

    let currentIndex = 0;

    while (currentIndex <= values.index) {
      setListState({
        ...listState,
        topIndex: currentIndex,
        changingIndex: currentIndex,
      });
      await setTimeoutPromise(SHORT_DELAY_IN_MS);
      currentIndex++;
    }

    linkedList.addByIndex(values.string, values.index);
    setListState({
      ...listState,
      items: linkedList.turnIntoArr(),
      topIndex: null,
      changingIndex: null,
      modifiedIndex: values.index,
    });

    await setTimeoutPromise(SHORT_DELAY_IN_MS);

    setListState({
      ...listState,
      items: linkedList.turnIntoArr(),
      modifiedIndex: null,
    });
    setValues({
      string: "",
      index: null,
    });

    setIsLoader(false);
    setAction(null);
  };

  const delByIndexHandler = async () => {
    if (values.index === null || values.index < 0) return;

    setAction(Action.DeleteByIndex);
    setIsLoader(true);

    let currentIndex = 0;

    while (currentIndex <= values.index) {
      setListState({
        ...listState,
        changingIndex: currentIndex,
      });
      await setTimeoutPromise(SHORT_DELAY_IN_MS);
      currentIndex++;
    }

    setListState({
      ...listState,
      bottomIndex: values.index,
      changingIndex: null,
    });
    await setTimeoutPromise(SHORT_DELAY_IN_MS);

    linkedList.delByIndex(values.index);
    setListState({
      ...listState,
      items: linkedList.turnIntoArr(),
      bottomIndex: null,
    });

    setValues({
      ...values,
      index: null,
    });

    setIsLoader(false);
    setAction(null);
  };

  const isIndexValid = (index: number): boolean => {
    if (index >= 0 && index < listState.items.length) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <Input
            maxLength={4}
            extraClass={styles.input}
            isLimitText={true}
            onChange={handleChange}
            value={values.string}
            name={"string"}
            disabled={isLoader}
          />
          <Button
            type="button"
            text="Добавить в head"
            extraClass={styles.button}
            onClick={addToHeadHandler}
            isLoader={isLoader && action === Action.AddToHead}
            disabled={
              !values.string || (isLoader && action !== Action.AddToHead)
            }
            data-testid={TEST_IDS.addToHeadBtn}
          />
          <Button
            type="button"
            text="Добавить в tail"
            extraClass={styles.button}
            onClick={addToTailHandler}
            isLoader={isLoader && action === Action.AddToTail}
            disabled={
              !values.string || (isLoader && action !== Action.AddToTail)
            }
            data-testid={TEST_IDS.addToTailBtn}
          />
          <Button
            type="button"
            text="Удалить из head"
            extraClass={styles.button}
            onClick={delFromHeadHandler}
            isLoader={isLoader && action === Action.DeleteFromHead}
            disabled={
              listState.items.length === 0 ||
              (isLoader && action !== Action.DeleteFromHead)
            }
            data-testid={TEST_IDS.delFromHeadBtn}
          />
          <Button
            type="button"
            text="Удалить из tail"
            extraClass={styles.button}
            onClick={delFromTailHandler}
            isLoader={isLoader && action === Action.DeleteFromTail}
            disabled={
              listState.items.length === 0 ||
              (isLoader && action !== Action.DeleteFromTail)
            }
            data-testid={TEST_IDS.delFromTailBtn}
          />
        </div>
        <div className={styles.wrapper}>
          <Input
            placeholder={ENTER_INDEX}
            type="number"
            maxLength={1}
            extraClass={styles.input}
            min={0}
            max={listState.items.length - 1}
            onChange={handleChange}
            value={
              values.index !== null && isIndexValid(values.index) ? values.index : ""
            }
            name={"index"}
            disabled={isLoader}
          />
          <Button
            type="button"
            text="Добавить по индексу"
            extraClass={styles.button}
            onClick={addByIndexHandler}
            isLoader={isLoader && action === Action.AddByIndex}
            disabled={
              !values.string ||
              values.index === null ||
              !isIndexValid(values.index) ||
              (isLoader && action !== Action.AddByIndex)
            }
            data-testid={TEST_IDS.addByIndexBtn}
          />
          <Button
            type="button"
            text="Удалить по индексу"
            extraClass={styles.button}
            onClick={delByIndexHandler}
            isLoader={isLoader && action === Action.DeleteByIndex}
            disabled={
              listState.items.length <= 1 ||
              values.index === null ||
              !isIndexValid(values.index) ||
              (isLoader && action !== Action.DeleteByIndex)
            }
            data-testid={TEST_IDS.delByIndexBtn}
          />
        </div>
      </div>
      <ul className={styles.list}>
        {listState.items.map((item, index, array) => {
          return (
            <div className={styles.circle} key={index}>
              <Circle
                letter={index === listState.bottomIndex ? "" : item}
                key={index}
                index={index}
                head={
                  listState.topIndex !== null && index === listState.topIndex ? (
                    <Circle
                      letter={values.string ? values.string : item}
                      isSmall={true}
                      state={ElementStates.Changing}
                    />
                  ) : undefined || index === 0 ? (
                    "head"
                  ) : undefined
                }
                state={
                  (index === listState.modifiedIndex &&
                    ElementStates.Modified) ||
                  (listState.changingIndex !== null &&
                    index <= listState.changingIndex &&
                    ElementStates.Changing) ||
                  ElementStates.Default
                }
                tail={
                  index === listState.bottomIndex ? (
                    <Circle
                      letter={item}
                      isSmall={true}
                      state={ElementStates.Changing}
                    />
                  ) : undefined || index === array.length - 1 ? (
                    "tail"
                  ) : undefined
                }
                data-testid={`circle-${index}`}
              />
              {index !== array.length - 1 && <ArrowIcon />}
            </div>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
