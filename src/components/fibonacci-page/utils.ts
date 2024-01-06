import { TSetLettersArrDispatch, TLetterObj } from "../../types/common";
import { setStateWithTimeout } from "../../utils/common";

export async function getFibonacciSequence(
  string: string | null,
  setLettersArr: React.Dispatch<React.SetStateAction<TSetLettersArrDispatch>>
) {
  const lettersArr: TLetterObj[] = [];

  let index = 0;
  let firstNum = 1;
  let secondNum = 1;

  while (index <= Number(string)) {
    let letterObj: TLetterObj | null = null;

    if (index === 0 || index === 1) {
      letterObj = {
        letter: '1',
        index: index,
        state: "default",
      };
    } else {
      letterObj = {
        letter: (firstNum + secondNum).toString(),
        index: index,
        state: "default",
      };
      let temp = firstNum;
      firstNum = secondNum;
      secondNum = temp + secondNum;
    }
    
    index++;

    // Добавление в массив нового элемента и отрисовка обновленного массива
    lettersArr.push(letterObj);
    await setStateWithTimeout(setLettersArr, 500, lettersArr);
  }
}
