import React, { FormEvent, useEffect, useRef, useState } from "react";
import styles from "./fibonacci-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import useForm from "../../hooks/useForm";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";
import { getFibonacciSequence } from "./utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const FibonacciPage: React.FC = () => {
  const { values, handleChange } = useForm({
    string: "",
    index: -1,
  });

  const fibonacciNumbers = useRef<number[]>([]);
  const intervalId = useRef<NodeJS.Timeout>();
  const [currentAlgorithmStep, setCurrentAlgorithmStep] = useState<
    number
  >(0);

  const isAlgorithmInProgress = currentAlgorithmStep < fibonacciNumbers.current.length;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const numCount = Number(values.string);
    fibonacciNumbers.current = getFibonacciSequence(numCount);
    setCurrentAlgorithmStep(0);

    intervalId.current = setInterval(() => {
      if (numCount > 0) {
        setCurrentAlgorithmStep((currentStep) => {
          let nextStep = 0;
          if (currentStep !== null) {
            nextStep = currentStep + 1;
          }

          if (nextStep > numCount && intervalId.current) {
            clearInterval(intervalId.current);
          }

          return nextStep;
        });
      }
    }, SHORT_DELAY_IN_MS);
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
          value={
            Number(values.string) > 0 && Number(values.string) <= 19
              ? values.string
              : ""
          }
          name={"string"}
          disabled={isAlgorithmInProgress}
        />
        <Button
          type={"submit"}
          text={"Рассчитать"}
          isLoader={isAlgorithmInProgress}
          linkedList={"big"}
          disabled={!values.string}
          data-testid={"button"}
        />
      </form>
      <ul className={styles.list}>
        {fibonacciNumbers.current.length > 0 &&
          currentAlgorithmStep > 0 &&
          fibonacciNumbers.current.map((letter, index) => {
            if (index <= currentAlgorithmStep - 1) {
              return (
                <Circle
                  letter={String(letter)}
                  key={index}
                  state={ElementStates.Default}
                  index={index}
                  data-testid={`circle-${index}`}
                />
              );
            }
          })}
      </ul>
    </SolutionLayout>
  );
};
