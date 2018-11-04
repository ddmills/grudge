import {
  autorun, computed, observable,
} from 'mobx';
import sdk from '@grudge/sdk';
import autobind from 'autobind-decorator';
import MobXCountdownTimer from 'utilities/mobx/MobXCountdownTimer';

@autobind
export default class UserStore {
  @observable
  timer = new MobXCountdownTimer();

  @computed
  get isOwnTurn() {
    return Boolean(
      this.contextStore.ctx && this.contextStore.ctx.isUsersTurn(this.userStore.currentUserId),
    );
  }

  @computed
  get turnStartedAtMs() {
    return this.contextStore.ctx && this.contextStore.ctx.turnStartedAtMs;
  }

  @computed
  get turnDuration() {
    return this.contextStore.ctx && this.contextStore.ctx.turnDuration;
  }

  @computed
  get endTurn() {
    if (this.contextStore.isRunning && this.isOwnTurn) {
      return () => sdk.endTurn();
    }

    return undefined;
  }

  constructor(contextStore, userStore) {
    this.contextStore = contextStore;
    this.userStore = userStore;

    autorun(this.configureTurnTimer);
  }

  configureTurnTimer() {
    if (this.contextStore.isRunning) {
      this.timer.restart(this.turnStartedAtMs, this.turnDuration);
    } else {
      this.timer.reset();
    }
  }
}
