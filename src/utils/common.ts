export const setTimeoutPromise = async (delay: number) => {
  return new Promise((func) => setTimeout(func, delay));
};

export const getIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomNumArr = (
  min: number = 0,
  max: number = 100,
  minLength: number = 3,
  maxLength: number = 17) => {
    const result = new Array(getIntFromInterval(minLength, maxLength)).fill(0);

  return Array.from(new Set(result.map(() => getIntFromInterval(min, max))));
};

export const getRandomStrArr = (min: number, max: number) => {
  const arrLength = getIntFromInterval(min, max);
  let randomArr: string[] = [];

  for (let i = 0; i <= arrLength; i++) {
    randomArr.push(getIntFromInterval(0, 100).toString());
  }

  return randomArr;
};
