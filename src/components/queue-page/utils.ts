type QueueClassType<T> = {
  enqueue: (item: T) => void;
  dequeue: () => void;
  getHead: () => number;
  getTail: () => number;
  clear: () => void;
  getItems: () => Array<T | undefined>;
  isEmpty: () => boolean;
};

export class Queue<T> implements QueueClassType<T> {
  private items: (T | undefined)[] = [];
  private head = -1;
  private tail = -1;
  private size: number = 0;
  private length: number = 0;

  constructor(size: number = 7) {
    this.size = size;
    this.items = new Array(size);
  }

  enqueue = (item: T) => {
    if (!item) {
      return;
    }

    if (this.length >= this.size) {
      throw new Error(
        "Извините, максимальное количество элементов в очереди - 6"
      );
    }

    this.tail++;

    if (this.length === 0) {
      this.head++;
    }

    this.items[this.tail] = item;
    this.length++;
  };

  dequeue = () => {
    if (this.length === 0) {
      return;
    }

    if (this.head >= this.tail) {
      this.items[this.head] = undefined;
      this.head = -1;
      this.tail = -1;
      this.length--;
      return;
    }

    this.items[this.head] = undefined;
    this.head++;
    this.length--;
  };

  getHead = () => {
    return this.head;
  };

  getTail = () => {
    return this.tail;
  };

  clear = () => {
    this.head = -1;
    this.tail = -1;
    this.length = 0;
    this.items = new Array(this.size);
  };

  getItems = () => {
    return [...this.items];
  };

  isEmpty = () => {
    return this.length < 1;
  };
}
