import {
  autorun, action, observable, computed,
} from 'mobx';
import autobind from 'autobind-decorator';
import sdk from '@grudge/sdk';
import MobXCountdownTimer from 'utilities/mobx/MobXCountdownTimer';

@autobind
export default class LobbyStore {
  @observable
  context = null;

  constructor(authStore, routerStore) {
    this.authStore = authStore;
    this.routerStore = routerStore;
  }

  @action
  setContext(context = null) {
    this.context = context;
    console.log(context);
  }

  joinContext(contextId) {
    sdk.joinContext(contextId).then(this.setContext);
  }
}
