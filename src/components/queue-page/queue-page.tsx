import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import styles from "./queue-page.module.css";
import { Queue } from "./utils";
import { Action } from "../../types/action";
import useForm from "../../hooks/useForm";
import { setTimeoutPromise } from "../../utils/common";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { TEST_IDS } from "../../constants/test-ids";

const queue = new Queue<string>();

type TQueueState = {
  items: (string | undefined)[];
  fillItemsCount: number;
  tailIndex: number | null;
  headIndex: number | null;
  addIndex: number | null;
  deletedIndex: number | null;
};

export const QueuePage: React.FC = () => {
  const [queueState, setQueueState] = useState<TQueueState>({
    items: queue.getItems(),
    fillItemsCount: 0,
    tailIndex: null,
    headIndex: null,
    addIndex: null,
    deletedIndex: null,
  });
  const [action, setAction] = useState<Action | null>(null);
  const [isLoader, setIsLoader] = useState<boolean>(false);

  const { values, handleChange, setValues } = useForm({
    string: "",
    index: -1,
  });

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAction(Action.Add);
    setIsLoader(true);

    if (values.string) {
      queue.enqueue(values.string);
      setQueueState({
        ...queueState,
        fillItemsCount: ++queueState.fillItemsCount,
      });
    }
    setQueueState({
      ...queueState,
      headIndex: queue.getHead(),
      tailIndex: queue.getTail(),
      addIndex: queue.getTail(),
    });
    await setTimeoutPromise(SHORT_DELAY_IN_MS);
    setQueueState({
      ...queueState,
      items: queue.getItems(),
      headIndex: queue.getHead(),
      tailIndex: queue.getTail(),
      addIndex: null,
    });

    setValues({
      ...values,
      string: "",
    });
    setIsLoader(false);
    setAction(null);
  };

  const deleteHandler = async () => {
    setAction(Action.Delete);
    setIsLoader(true);

    setQueueState({
      ...queueState,
      deletedIndex: queue.getHead(),
      fillItemsCount: --queueState.fillItemsCount,
    });
    await setTimeoutPromise(SHORT_DELAY_IN_MS);
    setQueueState({
      ...queueState,
      deletedIndex: null,
    });

    queue.dequeue();
    setQueueState({
      ...queueState,
      items: queue.getItems(),
      tailIndex: queue.getTail(),
      headIndex: queue.getHead(),
    });

    setIsLoader(false);
    setAction(null);
  };

  const clearHandler = async () => {
    setAction(Action.Clear);
    setIsLoader(true);

    queue.clear();
    
    await setTimeoutPromise(SHORT_DELAY_IN_MS);
    
    setQueueState({
      ...queueState,
      items: queue.getItems(),
      fillItemsCount: 0,
      tailIndex: queue.getTail(),
      headIndex: queue.getHead(),
    });

    setIsLoader(false);
    setAction(null);
  };

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.wrapper}>
        <form className={styles.form} onSubmit={submitHandler}>
          <Input
            maxLength={4}
            isLimitText={true}
            onChange={handleChange}
            value={values.string}
            name={"string"}
            disabled={isLoader}
          />
          <Button
            type="submit"
            text="Добавить"
            isLoader={isLoader && action === Action.Add}
            disabled={!values.string || (isLoader && action !== Action.Add)}
            data-testid={TEST_IDS.addButton}
          />
          <Button
            type="button"
            text="Удалить"
            onClick={deleteHandler}
            isLoader={isLoader && action === Action.Delete}
            disabled={queueState.fillItemsCount === 0 || (isLoader && action !== Action.Delete)}
            data-testid={TEST_IDS.delButton}
          />
        </form>
        <Button
          type="button"
          text="Очистить"
          onClick={clearHandler}
          isLoader={isLoader && action === Action.Clear}
          disabled={queueState.fillItemsCount === 0 || (isLoader && action !== Action.Clear)}
          data-testid={TEST_IDS.clearButton}
        />
      </div>
      <ul className={styles.list}>
        {queueState.items.length > 0 &&
          queueState.items.map((item, index) => {
            return (
              <Circle
                key={index}
                letter={item ? item : ""}
                index={index}
                head={index === queueState.headIndex ? "head" : null}
                state={
                  index === queueState.addIndex ||
                  index === queueState.deletedIndex
                    ? ElementStates.Changing
                    : ElementStates.Default
                }
                tail={index === queueState.tailIndex ? "tail" : null}
                data-testid={`circle-${index}`}
              />
            );
          })}
      </ul>
    </SolutionLayout>
  );
};
