import React from "react";
import renderer from "react-test-renderer";

import { Button } from "./button";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Button - корректность отрисовки", () => {
  let buttonElement;

  afterEach(() => {
    expect(buttonElement).toMatchSnapshot();
  });

  test("Button с текстом рендерится без ошибок", () => {
    buttonElement = renderer.create(<Button linkedList="small" text="Нажми на меня" />).toJSON();
  });

  test("Button без текста рендерится без ошибок", () => {
    buttonElement = renderer.create(<Button linkedList="small" />).toJSON();
  });

  test("Button в состоянии disabled рендерится без ошибок", () => {
    buttonElement = renderer.create(<Button linkedList="small" disabled />).toJSON();
  });

  test("Button с индикацией загрузки рендерится без ошибок", () => {
    buttonElement = renderer.create(<Button linkedList="small" isLoader={true} />).toJSON();
  });
});

describe("Button - корректность вызова коллбэка", () => {
  test("При нажатии на кнопку коллбэк вызывается корректно", () => {
    const callback = jest.fn();

    render(<Button text='Нажми на меня' onClick={callback} />);

    const button = screen.getByText('Нажми на меня');

    expect(callback).toHaveBeenCalledTimes(0);
    fireEvent.click(button);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
