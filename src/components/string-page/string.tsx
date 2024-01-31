import React, { FormEvent, useRef, useState } from "react";
import styles from "./string.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import useForm from "../../hooks/useForm";
import { getLetterState, getStringReversalSteps } from "./utils";
import { DELAY_IN_MS } from "../../constants/delays";

export const StringComponent: React.FC = () => {
  const { values, handleChange } = useForm({
    string: "",
    index: -1,
  });

  const intervalId = useRef<NodeJS.Timeout>();
  const [algorithmSteps, setAlgorithmSteps] = useState<string[][]>([]);
  const [currentAlgorithmStep, setCurrentAlgorithmStep] = useState<number>(0);

  const isAlgorithmInProgress =
    currentAlgorithmStep < algorithmSteps.length - 1;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const steps = getStringReversalSteps(values.string);
    setAlgorithmSteps(steps);
    setCurrentAlgorithmStep(0);

    if (steps.length) {
      intervalId.current = setInterval(() => {
        setCurrentAlgorithmStep((currentStep) => {
          const nextStep = currentStep + 1;

          if (nextStep >= steps.length - 1 && intervalId.current) {
            clearInterval(intervalId.current);
          }

          return nextStep;
        });
      }, DELAY_IN_MS);
    }
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
          onChange={handleChange}
          value={values.string}
          name={"string"}
          disabled={isAlgorithmInProgress}
        />
        <Button
          type={"submit"}
          text={"Развернуть"}
          isLoader={isAlgorithmInProgress}
          linkedList={"big"}
          disabled={!values.string}
          data-testid={"button"}
        />
      </form>
      <ul className={styles.list}>
        {algorithmSteps.length > 0 &&
          algorithmSteps[currentAlgorithmStep].map((letter, index) => {
            let state = getLetterState(
              index,
              values.string.length - 1,
              currentAlgorithmStep
            );

            return <Circle letter={letter} key={index} data-testid={`circle-${index}`} state={state} />;
          })}
      </ul>
    </SolutionLayout>
  );
};
