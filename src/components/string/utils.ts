import { TSetLettersArrDispatch, TLetterObj } from "../../types/common";
import { setStateWithTimeout, swap } from "../../utils/common";

export async function reverseStr(
  str: string,
  setLettersArr: React.Dispatch<React.SetStateAction<TSetLettersArrDispatch>>
) {
  const lettersArr = str.split("").map((letter) => {
    let circle = {
      letter: letter,
      state: "default",
    };
    return circle;
  });

  // Указатели на начало и на конец сортируемого участка массива
  let headIndex = 0;
  let tailIndex = lettersArr.length - 1;

  // Отрисовка начального состояния массива (цвет - синий)
  await setStateWithTimeout(setLettersArr, 1000, lettersArr);

  while (headIndex < tailIndex) {
    swap<TLetterObj>(lettersArr, headIndex, tailIndex);

    // Смена состояния уже отсортированных элементов (цвет - зеленый) и отрисовка массива
    lettersArr[headIndex].state = "modified";
    lettersArr[tailIndex].state = "modified";
    await setStateWithTimeout(setLettersArr, 1000, lettersArr);

    // Сдвиг указателей на единицу
    headIndex++;
    tailIndex--;

    // Смена состояния кандидатов на сортировку (цвет - сиреневый) и отрисовка массива
    if (headIndex < tailIndex) {
      lettersArr[headIndex].state = "changing";
      lettersArr[tailIndex].state = "changing";
      await setStateWithTimeout(setLettersArr, 1000, lettersArr);
    }
  }

  // Смена состояния всех элементов итогового массива (цвет - синий)
  let resArr = lettersArr.map((letter: TLetterObj) => {
    letter.state = "default";
    return letter;
  });

  // Отрисовка итогового массива
  setStateWithTimeout(setLettersArr, 1000, resArr);
}
