type TStack<T> = {
  push: (item: T) => void;
  pop: () => void;
  clear: () => void;
  getItems: () => Array<T | undefined>;
  getTop: () => number;
  getSize: () => number;
};

export class Stack<T> implements TStack<T> {
  private items: (T | undefined)[] = [];
  private top = -1;

  constructor() {
    this.items = [];
  }

  push = (item: T) => {
    if (!item) {
      return;
    }
    this.items.push(item);
    this.top++;
  };

  pop = () => {
    if (this.top < 0) {
      return;
    }
    this.items.pop();
    this.top--;
  };

  clear = () => {
    this.items = [];
    this.top = -1;
  };

  getItems = () => this.items;
  getTop = () => this.top;
  getSize = () => this.items.length;
}
