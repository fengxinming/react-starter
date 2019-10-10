import { observable, action } from 'mobx';
import sleep from 'celia/sleep';

class Store {
  @observable count = 0;

  @action.bound increment() {
    this.count++;
  }

  @action.bound decrement() {
    this.count--;
  }

  @action.bound incrementIfOdd() {
    if ((this.count + 1) % 2 === 0) {
      this.increment();
    }
  }

  @action.bound incrementAsync() {
    sleep(1000).then(this.increment);
  }
}

export default new Store();
