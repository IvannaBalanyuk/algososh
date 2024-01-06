type LinkedListType<T> = {
  addToHead: (item: T) => void;
  addToTail: (item: T) => void;
  delFromHead: () => void;
  delFromTail: () => void;
  addByIndex: (item: T, index: number) => void;
  delByIndex: (index: number) => void;
  turnIntoArr: () => T[] | undefined;
};

class LinkedListNode<T> {
  value: T;
  next: LinkedListNode<T> | null;
  constructor(value: T, next?: LinkedListNode<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

export class LinkedList<T> implements LinkedListType<T> {
  private head: LinkedListNode<T> | null;
  private size: number;
  constructor(initialArr: T[]) {
    this.head = null;
    this.size = 0;
    initialArr.forEach((item) => this.addToTail(item));
  }

  addToHead(item: T) {
    const node = new LinkedListNode(item);

    if (this.head === null) {
      this.head = node;
    } else {
      node.next = this.head;
      this.head = node;
    }
    this.size++;
  }

  addToTail(item: T) {
    const node = new LinkedListNode(item);
    let curr;

    if (this.head === null) {
      this.head = node;
    } else {
      curr = this.head;
      while (curr.next) {
        curr = curr.next;
      }

      curr.next = node;
    }

    this.size++;
  }

  delFromHead = () => {
    if (this.head === null) {
      return;
    }

    if (this.head.next) {
      let curr = this.head.next;
      this.head.next = null;
      this.head = curr;
      this.size--;
      return;
    }

    this.head = null;
    this.size--;
  };

  delFromTail = () => {
    if (this.head === null) {
      return;
    }

    let size = this.getSize();

    if (size === 1) {
      this.delFromHead();
    } else if (size === 2) {
      this.head.next = null;
    } else {
      let count = size - 2;
      let curr = this.head;

      while (curr.next && count > 0) {
        curr = curr.next;
        count--;
      }

      curr.next = null;
    }

    this.size--;
  };

  addByIndex(item: T, index: number) {
    if (index < 0 || index > this.size) {
      throw new Error("Enter a valid index");
    } else {
      const node = new LinkedListNode(item);

      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else if (this.head !== null) {
        let curr = this.head;
        let currIndex = 0;

        while (currIndex !== index - 1 && curr.next !== null) {
          curr = curr.next;
          currIndex++;
        }

        node.next = curr.next;
        curr.next = node;
      }

      this.size++;
    }
  }

  delByIndex(index: number) {
    if (index < 0 || index > this.size) {
      throw new Error("Enter a valid index");
    }

    if (this.head) {
      if (index === 0) {
        this.delFromHead();
      } else if (index === this.size - 1) {
        this.delFromTail();
      } else {
        let curr: LinkedListNode<T> = this.head;
        let prev: LinkedListNode<T> = curr;
        let currIndex = 1;

        while (curr.next && currIndex < index) {
          currIndex++;
          prev = curr;
          curr = curr.next;
        }

        prev.next = curr.next;
      }
    }

    this.size--;
  }

  turnIntoArr = () => {
    if (this.head === null) {
      return [];
    }

    let array = [];
    let curr = this.head;
    array.push(curr.value);

    while (curr.next) {
      array.push(curr.next.value);
      curr = curr.next;
    }

    return array;
  };

  getSize() {
    return this.size;
  }
}
