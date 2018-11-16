import {
  autorun, computed, action, observable,
} from 'mobx';
import sdk from '@grudge/sdk';
import autobind from 'autobind-decorator';

@autobind
export default class UserStore {
  @observable
  currentUser = null;

  @computed
  get currentUserId() {
    return this.currentUser && this.currentUser.id;
  }

  constructor(authStore) {
    this.authStore = authStore;

    sdk.onJoinedContext(this.onJoinedContext);
    sdk.onLeftContext(this.onLeftContext);

    autorun(this.fetchCurrentUser);
  }

  @action
  setCurrentUser(user) {
    this.currentUser = user;
  }

  fetchCurrentUser() {
    if (this.authStore.userId) {
      sdk.getUser(this.authStore.userId).then(this.setCurrentUser);
    } else {
      this.setCurrentUser();
    }
  }

  @action
  onJoinedContext(contextId) {
    this.currentUser.contextId = contextId;
  }

  @action
  onLeftContext() {
    this.currentUser.contextId = null;
  }
}
