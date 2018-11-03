import { action, computed, observable } from 'mobx';
import autobind from 'autobind-decorator';

@autobind
export default class MenuStore {
  @observable
  isOpen = false;

  @computed
  get isVisible() {
    return this.menuItems.length > 0;
  }

  constructor(contextStore) {
    this.contextStore = contextStore;
  }

  @action
  open() {
    this.isOpen = true;
  }

  @action
  close() {
    this.isOpen = false;
  }

  @computed
  get menuItems() {
    const items = [];
    const { ctx } = this.contextStore;

    if (ctx) {
      items.push({
        label: ctx.isRunning ? 'Forfeit game' : 'Leave game',
        color: 'red',
        fn: () => {
          this.contextStore.leaveContext();
          this.close();
        },
      });
    }

    return items;
  }
}
