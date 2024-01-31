import { ElementStates } from '../../types/element-states';
import { getStringReversalSteps, getLetterState } from './utils';

describe("Функция получения массива шагов разворота строки getStringReversalSteps", () => {
  test("корректно разворачивает строку с четным количеством символов", () => {
    expect(getStringReversalSteps('дата')).toEqual([['д', 'а', 'т', 'а'], ['а', 'а', 'т', 'д'], ['а', 'т', 'а', 'д']]);
  });

  test("корректно разворачивает строку с нечетным количеством символов", () => {
    expect(getStringReversalSteps('цифра')).toEqual([['ц', 'и', 'ф', 'р', 'а'], ['а', 'и', 'ф', 'р', 'ц'], ['а', 'р', 'ф', 'и', 'ц']]);
  });

  test("корректно разворачивает строку с одним символом", () => {
    expect(getStringReversalSteps('я')).toEqual([['я']]);
  });

  test("корректно разворачивает пустую строку", () => {
    expect(getStringReversalSteps('')).toEqual([[]]);
  });
});


describe("Функция получения состояния буквы getLetterState", () => {
  const evenNumStr = 'cucumber';
  const oddNumStr = 'pineapple';

  test("возвращает default для четной строки по завершении разворота", () => {
    expect(getLetterState(4, evenNumStr.length - 1, 4)).toBe(ElementStates.Default);
  });

  test("возвращает modified для уже переставленных символов четной строки", () => {
    expect(getLetterState(0, evenNumStr.length - 1, 1)).toBe(ElementStates.Modified);
  });

  test("возвращает modified для уже переставленных символов нечетной строки", () => {
    expect(getLetterState(0, oddNumStr.length - 1, 1)).toBe(ElementStates.Modified);
  });

  test("возвращает changing для переставляемых символов четной строки", () => {
    expect(getLetterState(1, evenNumStr.length - 1, 1)).toBe(ElementStates.Changing);
  });

  test("возвращает changing для переставляемых символов нечетной строки", () => {
    expect(getLetterState(1, oddNumStr.length - 1, 1)).toBe(ElementStates.Changing);
  });

  test("возвращает default для ещё не переставленных символов четной строки", () => {
    expect(getLetterState(2, evenNumStr.length - 1, 1)).toBe(ElementStates.Default);
  });

  test("возвращает default для ещё не переставленных символов нечетной строки", () => {
    expect(getLetterState(2, oddNumStr.length - 1, 1)).toBe(ElementStates.Default);
  });
});
