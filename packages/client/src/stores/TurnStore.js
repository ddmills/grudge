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
  get currentTurnUser() {
    return this.lobbyStore.lobby && this.lobbyStore.lobby.pickCurrentTurnUser(this.userStore.users);
  }

  @computed
  get isOwnTurn() {
    return Boolean(
      this.currentTurnUser && this.currentTurnUser.id === this.userStore.currentUserId,
    );
  }

  @computed
  get turnStartedAtMs() {
    return this.lobbyStore.lobby && this.lobbyStore.lobby.turnStartedAtMs;
  }

  @computed
  get turnDuration() {
    return this.lobbyStore.lobby && this.lobbyStore.lobby.turnDuration;
  }

  @computed
  get endTurn() {
    if (this.lobbyStore.isRunning && this.isOwnTurn) {
      return () => sdk.endTurn();
    }

    return undefined;
  }

  constructor(lobbyStore, userStore) {
    this.lobbyStore = lobbyStore;
    this.userStore = userStore;

    autorun(this.configureTurnTimer);
  }

  configureTurnTimer() {
    if (this.lobbyStore.isRunning) {
      this.timer.restart(this.turnStartedAtMs, this.turnDuration);
    } else {
      this.timer.reset();
    }
  }
}
