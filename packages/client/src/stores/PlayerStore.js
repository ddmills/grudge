import { computed } from 'mobx';
import sdk from '@grudge/sdk';
import autobind from 'autobind-decorator';

@autobind
export default class PlayerStore {
  @computed
  get canAddBotPlayer() {
    const { ctx } = this.contextStore;

    return Boolean(ctx && ctx.isSettingUp && !ctx.isCountingDown && !ctx.isFull);
  }

  @computed
  get addBotPlayer() {
    if (this.canAddBotPlayer) {
      return () => {
        sdk.addBotPlayer();
      };
    }

    return undefined;
  }

  constructor(contextStore) {
    this.contextStore = contextStore;
  }
}
