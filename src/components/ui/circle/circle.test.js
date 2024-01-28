import renderer from "react-test-renderer";
import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";

describe("Компонент Circle рендерится без ошибок", () => {
  let circleElement;

  afterEach(() => {
    expect(circleElement).toMatchSnapshot();
  });

  test("с буквой", () => {
    circleElement = renderer.create(<Circle letter="F" />).toJSON();
  });

  test("без буквы", () => {
    circleElement = renderer.create(<Circle />).toJSON();
  });

  test("с head", () => {
    circleElement = renderer.create(<Circle head="Head" />).toJSON();
  });

  test("с react-элементом в head", () => {
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

  test("с tail", () => {
    circleElement = renderer.create(<Circle tail="Tail" />).toJSON();
  });

  test("с react-элементом в tail", () => {
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

  test("с index", () => {
    circleElement = renderer.create(<Circle index={5} />).toJSON();
  });

  test("с пропом isSmall ===  true", () => {
    circleElement = renderer.create(<Circle isSmall={true} />).toJSON();
  });

  test("в состоянии default", () => {
    circleElement = renderer
      .create(<Circle state={ElementStates.Default} />)
      .toJSON();
  });

  test("в состоянии changing", () => {
    circleElement = renderer
      .create(<Circle state={ElementStates.Changing} />)
      .toJSON();
  });

  test("в состоянии modified", () => {
    circleElement = renderer
      .create(<Circle state={ElementStates.Modified} />)
      .toJSON();
  });
});
