export function getFibonacciSequence(count: number): number[] {
  if(count < 0 || count > 19) {
    throw new Error(
      "Введено недопустимое значение. Допустимые значения - от 0 до 19 включительно"
    );
  }

  if (count === 0) {
    return [1];
  }

  if (count === 1) {
    return [1, 1];
  }

  const fibonacciNumbers: number[] = [1, 1];

  for (let i = 2; i <= count; i++) {
    const firstNum = fibonacciNumbers[i - 1];
    const secondNum = fibonacciNumbers[i - 2];
    fibonacciNumbers.push(firstNum + secondNum);
  }

  console.log(fibonacciNumbers);

  return fibonacciNumbers;
}
