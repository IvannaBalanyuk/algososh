import React, { FormEvent, useState } from "react";
import styles from "./fibonacci-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import useForm from "../../hooks/useForm";
import { TSetLettersArrDispatch } from "../../types/common";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";
import { getFibonacciSequence } from "./utils";

export const FibonacciPage: React.FC = () => {
  const { values, handleChange } = useForm({
    string: "",
    index: -1,
  });

  const [lettersArr, setLettersArr] = useState<TSetLettersArrDispatch>([]);
  const [isLoader, setIsLoader] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoader(true);

    await getFibonacciSequence(values.string, setLettersArr);

    setIsLoader(false);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form
        className={styles.wrapper}
        action="recursion"
        onSubmit={handleSubmit}
      >
        <Input
          type="number"
          isLimitText={true}
          max={19}
          onChange={handleChange}
          value={Number(values.string) > 0 && Number(values.string) <= 19 ? values.string : ""}
          name={"string"}
          disabled={isLoader}
        />
        <Button
          type={"submit"}
          text={"Рассчитать"}
          isLoader={isLoader}
          linkedList={"big"}
          disabled={!values.string}
        />
      </form>
      <ul className={styles.list}>
        {lettersArr.length > 0 &&
          lettersArr.map((letterObj, index) => {
            let state =
              letterObj.state === "default" ? ElementStates.Default : undefined;

            return (
              <Circle
                letter={letterObj.letter}
                key={index}
                state={state}
                index={letterObj.index}
              />
            );
          })}
      </ul>
    </SolutionLayout>
  );
};
