export default class Stack<T> {
  private size = 0;

  private storage: { [index: number]: { data: T; code: string } } = {};

  push(data: { data: T; code: string }) {
    const index = this.size + 1;
    this.size += 1;
    this.storage[index] = data;
  }

  pop() {
    const deletedData = this.storage[this.size];

    delete this.storage[this.size];
    this.size -= 1;

    return deletedData;
  }

  empty() {
    return !this.size;
  }
}
