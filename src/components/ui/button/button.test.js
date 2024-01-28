import React from "react";
import renderer from "react-test-renderer";

import { Button } from "./button";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Компонент Button рендерится без ошибок", () => {
  let buttonElement;

  afterEach(() => {
    expect(buttonElement).toMatchSnapshot();
  });

  test("с текстом", () => {
    buttonElement = renderer.create(<Button linkedList="small" text="Нажми на меня" />).toJSON();
  });

  test("без текста", () => {
    buttonElement = renderer.create(<Button linkedList="small" />).toJSON();
  });

  test("в состоянии disabled", () => {
    buttonElement = renderer.create(<Button linkedList="small" disabled />).toJSON();
  });

  test("с индикацией загрузки", () => {
    buttonElement = renderer.create(<Button linkedList="small" isLoader={true} />).toJSON();
  });
});

describe("Компонент Button", () => {
  test("Коллбэк вызывается корректно", () => {
    const callback = jest.fn();

    render(<Button text='Нажми на меня' onClick={callback} />);

    const button = screen.getByText('Нажми на меня');

    expect(callback).toHaveBeenCalledTimes(0);
    fireEvent.click(button);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
