import { getFibonacciSequence } from "./utils";

describe("Функция получения последовательности Фибоначчи getFibonacciSequence корректно работает", () => {
  test("возвращает правильную последовательность при передаче валидного значения", () => {
    expect(getFibonacciSequence(5)).toEqual([1, 1, 2, 3, 5, 8]);
  });

  test("возвращает правильную последовательность при передаче пограничного значения", () => {
    expect(getFibonacciSequence(0)).toEqual([1]);
    expect(getFibonacciSequence(19)).toEqual([
      1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584,
      4181, 6765,
    ]);
  });

  test("возвращает ошибку при передаче невалидного значения", () => {
    function testWithLessThanNeed() {
      getFibonacciSequence(-1);
    }

    function testWithMoreThanNeed() {
      getFibonacciSequence(20);
    }

    expect(testWithLessThanNeed).toThrow(
      new Error(
        "Введено недопустимое значение. Допустимые значения - от 0 до 19 включительно"
      )
    );

    expect(testWithMoreThanNeed).toThrow(
      new Error(
        "Введено недопустимое значение. Допустимые значения - от 0 до 19 включительно"
      )
    );
  });
});
