import { autorun, action, observable } from 'mobx';
import sdk from '@grudge/sdk';

export default class UserStore {
  @observable
  currentUser = null;

  constructor(authStore) {
    this.authStore = authStore;

    autorun(() => {
      if (this.authStore.userId) {
        sdk.getUser(this.authStore.userId).then(action((user) => {
          this.currentUser = user;
        }));
      } else {
        this.currentUser = null;
      }
    });
  }
}
