import renderer from "react-test-renderer";
import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";

describe("Circle - корректность отрисовки", () => {
  let circleElement;

  afterEach(() => {
    expect(circleElement).toMatchSnapshot();
  });

  test("Circle с буквой рендерится без ошибок", () => {
    circleElement = renderer.create(<Circle letter="F" />).toJSON();
  });

  test("Circle без буквы рендерится без ошибок", () => {
    circleElement = renderer.create(<Circle />).toJSON();
  });

  test("Circle с head рендерится без ошибок", () => {
    circleElement = renderer.create(<Circle head="Head" />).toJSON();
  });

  test("Circle с react-элементом в head рендерится без ошибок", () => {
    circleElement = renderer
      .create(
        <Circle
          head={
            <Circle letter="F" isSmall={true} state={ElementStates.Changing} />
          }
        />
      )
      .toJSON();
  });

  test("Circle с tail рендерится без ошибок", () => {
    circleElement = renderer.create(<Circle tail="Tail" />).toJSON();
  });

  test("Circle с react-элементом в tail рендерится без ошибок", () => {
    circleElement = renderer
      .create(
        <Circle
          tail={
            <Circle letter="F" isSmall={true} state={ElementStates.Changing} />
          }
        />
      )
      .toJSON();
  });

  test("Circle с index рендерится без ошибок", () => {
    circleElement = renderer.create(<Circle index={5} />).toJSON();
  });

  test("Circle с пропом isSmall ===  true рендерится без ошибок", () => {
    circleElement = renderer.create(<Circle isSmall={true} />).toJSON();
  });

  test("Circle в состоянии default рендерится без ошибок", () => {
    circleElement = renderer
      .create(<Circle state={ElementStates.Default} />)
      .toJSON();
  });

  test("Circle в состоянии changing рендерится без ошибок", () => {
    circleElement = renderer
      .create(<Circle state={ElementStates.Changing} />)
      .toJSON();
  });

  test("Circle в состоянии modified рендерится без ошибок", () => {
    circleElement = renderer
      .create(<Circle state={ElementStates.Modified} />)
      .toJSON();
  });
});
