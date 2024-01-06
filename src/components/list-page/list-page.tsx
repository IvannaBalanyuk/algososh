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
    await setTimeoutPromise(500);

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
    await setTimeoutPromise(500);

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
    await setTimeoutPromise(500);

    linkedList.addToTail(values.string);
    const newItems = linkedList.turnIntoArr();
    setListState({
      ...listState,
      items: newItems,
      topIndex: null,
      modifiedIndex: linkedList.getSize() - 1,
    });
    await setTimeoutPromise(500);

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
    await setTimeoutPromise(500);

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
    await setTimeoutPromise(500);

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
    if (values.index && (values.string.length === 0 || values.index < 0))
      return;

    setAction(Action.AddByIndex);
    setIsLoader(true);

    let currentIndex = -1;

    while (values.index && currentIndex <= values.index) {
      setListState({
        ...listState,
        topIndex: currentIndex,
        changingIndex: currentIndex,
      });
      await setTimeoutPromise(500);
      currentIndex++;
    }

    if (values.index) {
      linkedList.addByIndex(values.string, values.index);
      setListState({
        ...listState,
        items: linkedList.turnIntoArr(),
        topIndex: null,
        changingIndex: null,
        modifiedIndex: values.index,
      });
    }
    await setTimeoutPromise(500);

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
    if (values.index && values.index < 0) return;

    setAction(Action.DeleteByIndex);
    setIsLoader(true);

    let currentIndex = -1;

    while (values.index && currentIndex <= values.index) {
      setListState({
        ...listState,
        changingIndex: currentIndex,
      });
      await setTimeoutPromise(500);
      currentIndex++;
    }

    if (values.index) {
      setListState({
        ...listState,
        bottomIndex: values.index,
        changingIndex: null,
      });
      await setTimeoutPromise(500);

      linkedList.delByIndex(values.index);
      setListState({
        ...listState,
        items: linkedList.turnIntoArr(),
        bottomIndex: null,
      });
    }

    setValues({
      ...values,
      index: null,
    });

    setIsLoader(false);
    setAction(null);
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <Input
            maxLength={4}
            extraClass={styles.input}
            isLimitText={true}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e)
            }
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
            disabled={isLoader && action !== Action.AddToHead}
          />
          <Button
            type="button"
            text="Добавить в tail"
            extraClass={styles.button}
            onClick={addToTailHandler}
            isLoader={isLoader && action === Action.AddToTail}
            disabled={isLoader && action !== Action.AddToTail}
          />
          <Button
            type="button"
            text="Удалить из head"
            extraClass={styles.button}
            onClick={delFromHeadHandler}
            isLoader={isLoader && action === Action.DeleteFromHead}
            disabled={isLoader && action !== Action.DeleteFromHead}
          />
          <Button
            type="button"
            text="Удалить из tail"
            extraClass={styles.button}
            onClick={delFromTailHandler}
            isLoader={isLoader && action === Action.DeleteFromTail}
            disabled={isLoader && action !== Action.DeleteFromTail}
          />
        </div>
        <div className={styles.wrapper}>
          <Input
            placeholder="Введите индекс"
            type="number"
            maxLength={1}
            extraClass={styles.input}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e)
            }
            value={values.index ? values.index : ""}
            name={"index"}
            disabled={isLoader}
          />
          <Button
            type="button"
            text="Добавить по индексу"
            extraClass={styles.button}
            onClick={addByIndexHandler}
            isLoader={isLoader && action === Action.AddByIndex}
            disabled={isLoader && action !== Action.AddByIndex}
          />
          <Button
            type="button"
            text="Удалить по индексу"
            extraClass={styles.button}
            onClick={delByIndexHandler}
            isLoader={isLoader && action === Action.DeleteByIndex}
            disabled={isLoader && action !== Action.DeleteByIndex}
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
                  index === listState.topIndex ? (
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
                  (listState.changingIndex &&
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
              />
              {index !== array.length - 1 && <ArrowIcon />}
            </div>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
