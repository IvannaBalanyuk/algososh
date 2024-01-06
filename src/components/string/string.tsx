import React, { FormEvent, useState } from "react";
import styles from "./string.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import useForm from "../../hooks/useForm";
import { reverseStr } from "./utils";
import { TSetLettersArrDispatch } from "../../types/common";

export const StringComponent: React.FC = () => {
  const { values, handleChange } = useForm({
    string: "",
    index: -1,
  });

  const [lettersArr, setLettersArr] = useState<TSetLettersArrDispatch>([]);
  const [isLoader, setIsLoader] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoader(true);

    await reverseStr(values.string, setLettersArr);

    setIsLoader(false);
  };

  return (
    <SolutionLayout title="Строка">
      <form
        className={styles.wrapper}
        action="recursion"
        onSubmit={handleSubmit}
      >
        <Input
          maxLength={11}
          isLimitText={true}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
          value={values.string}
          name={"string"}
          disabled={isLoader}
        />
        <Button
          type={"submit"}
          text={"Развернуть"}
          isLoader={isLoader}
          linkedList={"big"}
        />
      </form>
      <ul className={styles.list}>
        {lettersArr.length > 0 &&
          lettersArr.map((letterObj, index) => {
            let state =
              letterObj.state === "default"
                ? ElementStates.Default
                : undefined || letterObj.state === "changing"
                ? ElementStates.Changing
                : undefined || letterObj.state === "modified"
                ? ElementStates.Modified
                : undefined;

            return (
              <Circle letter={letterObj.letter} key={index} state={state} />
            );
          })}
      </ul>
    </SolutionLayout>
  );
};
