import { observable, action, computed } from 'mobx';
import autobind from 'autobind-decorator';

@autobind
export default class CounterStore {
  @observable
  count = 0;

  @action
  increment() {
    this.count++;
  }

  @action
  reset() {
    this.count = 0;
  }

  @computed
  get isLoading() {
    return this.count % 3 === 0;
  }
}
