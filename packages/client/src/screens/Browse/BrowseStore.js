import { action, observable } from 'mobx';
import { Context } from '@grudge/domain';
import sdk from '@grudge/sdk';
import autobind from 'autobind-decorator';

export default class BrowseStore {
  @observable
  contexts = [];

  constructor(routerStore) {
    this.routerStore = routerStore;
  }

  @autobind
  @action
  refreshContexts() {
    this.contexts = [];
    sdk.listContexts().then(action((contexts) => {
      this.contexts = Context.deserializeAll(contexts);
    }));
  }

  @autobind
  createContext() {
    sdk.createContext().then(action((context) => {
      this.routerStore.navigate('game', { contextId: context.id });
      this.contexts.unshift(Context.deserialize(context));
    }));
  }
}
