import { action, observable } from 'mobx';
import autobind from 'autobind-decorator';

export default class ProfileStore {
  @observable user;

  constructor(userStore) {
    this.userStore = userStore;
  }

  @autobind
  getUser(userId) {
    this.user = undefined;
    this.userStore.getUser(userId).then(action((user) => {
      this.user = user;
    }));
  }
}
