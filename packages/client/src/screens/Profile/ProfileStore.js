import { action, observable } from 'mobx';
import autobind from 'autobind-decorator';
import sdk from '@grudge/sdk';

export default class ProfileStore {
  @observable user;

  @observable error;

  constructor(userStore) {
    this.userStore = userStore;
  }

  @autobind
  @action
  getUser(userId) {
    this.user = undefined;
    this.error = undefined;
    sdk.getUser(userId).then(action((user) => {
      this.user = user;
    })).catch((error) => {
      this.error = error;
    });
  }
}
