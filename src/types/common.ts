export type TLetterObj = {
  letter: string;
  state?: string;
  index?: number;
};

export type TSetLettersArrDispatch = TLetterObj[];

export type TColumnObj = {
  index: number;
  state?: string;
};

export type TSetColumnsArrDispatch = TColumnObj[];