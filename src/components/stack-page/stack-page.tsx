import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import styles from "./stack-page.module.css";
import { Stack } from "../stack-page/utils";
import { Action } from "../../types/action";
import useForm from "../../hooks/useForm";
import { setTimeoutPromise } from "../../utils/common";

const stack = new Stack<string>();

type TStackState = {
  items: (string | undefined)[];
  topIndex: number | null;
  changedIndex: number | null;
};

export const StackPage: React.FC = () => {
  const [stackState, setStackState] = useState<TStackState>({
    items: [],
    topIndex: null,
    changedIndex: null,
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

    stack.push(values.string);
    
    setStackState({
      items: stack.getItems(),
      topIndex: stack.getTop(),
      changedIndex: stack.getTop(),
    });
    await setTimeoutPromise(500);
    setStackState({
      items: stack.getItems(),
      topIndex: stack.getTop(),
      changedIndex: null,
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

    setStackState({
      ...stackState,
      items: stack.getItems(),
      changedIndex: stack.getTop(),
    });
    await setTimeoutPromise(500);
    stack.pop();
    setStackState({
      ...stackState,
      items: stack.getItems(),
      topIndex: stack.getTop(),
    });

    setIsLoader(false);
    setAction(null);
  };

  const clearHandler = async () => {
    setAction(Action.Clear);
    setIsLoader(true);

    await setTimeoutPromise(500);
    stack.clear();
    setStackState({
      ...stackState,
      items: stack.getItems(),
      topIndex: stack.getTop(),
    });

    setIsLoader(false);
    setAction(null);
  };

  return (
    <SolutionLayout title="Стек">
      <div className={styles.wrapper}>
        <form className={styles.form} onSubmit={submitHandler}>
          <Input
            maxLength={4}
            isLimitText={true}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e)
            }
            value={values.string}
            name={"string"}
            disabled={isLoader}
          />
          <Button
            type="submit"
            text="Добавить"
            isLoader={isLoader && action === Action.Add}
            disabled={isLoader && action !== Action.Add}
          />
          <Button
            type="button"
            text="Удалить"
            onClick={deleteHandler}
            isLoader={isLoader && action === Action.Delete}
            disabled={isLoader && action !== Action.Delete}
          />
        </form>
        <Button
          type="button"
          text="Очистить"
          onClick={clearHandler}
          isLoader={isLoader && action === Action.Clear}
          disabled={isLoader && action !== Action.Clear}
        />
      </div>
      <ul className={styles.list}>
        {stackState.items.length > 0 &&
          stackState.items.map((item, index) => {
            return (
              <Circle
                key={index}
                letter={item}
                index={index}
                head={index === stackState.topIndex ? "top" : undefined}
                state={
                  index === stackState.changedIndex
                    ? ElementStates.Changing
                    : ElementStates.Default
                }
              />
            );
          })}
      </ul>
    </SolutionLayout>
  );
};
