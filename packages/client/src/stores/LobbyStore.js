import {
  autorun, action, observable, computed,
} from 'mobx';
import autobind from 'autobind-decorator';
import sdk from '@grudge/sdk';
import MobXCountdownTimer from 'utilities/mobx/MobXCountdownTimer';

@autobind
export default class LobbyStore {
  @observable
  lobby = null;

  @observable
  error = null;

  @observable
  countdownTimer = new MobXCountdownTimer();

  @computed
  get isLobbyOwner() {
    return this.lobby && this.lobby.ownerId === this.authStore.userId;
  }

  @computed
  get isLobbyCountdownStarted() {
    return this.lobby && this.lobby.isCountdownStarted;
  }

  @computed
  get isRunning() {
    return Boolean(this.lobby && this.lobby.isRunning);
  }

  @computed
  get isSettingUp() {
    return Boolean(this.lobby && this.lobby.isSettingUp);
  }

  @computed
  get lobbyId() {
    return this.lobby && this.lobby.id;
  }

  constructor(authStore, routerStore) {
    this.authStore = authStore;
    this.routerStore = routerStore;

    sdk.onJoinedLobby(this.setLobby);
    sdk.onLeftLobby(this.onLeftLobby);
    sdk.onLobbyStarted(this.setLobby);
    sdk.onLobbyEnded(this.setLobby);
    sdk.onTurnEnded(this.setLobby);
    sdk.onLobbyCountdownStarted(this.setLobby);
    sdk.onLobbyCountdownStopped(this.setLobby);

    autorun(this.getCurrentLobby);
    autorun(this.configureCountdownTimer);
  }

  @action
  setError(error = null) {
    this.error = error;
  }

  @action
  setLobby(lobby = null) {
    this.lobby = lobby;
  }

  configureCountdownTimer() {
    if (this.isLobbyCountdownStarted) {
      this.countdownTimer.start(this.lobby.countdownStartedAtMs, this.lobby.countdownDuration);
    } else {
      this.countdownTimer.reset();
    }
  }

  getCurrentLobby() {
    if (this.authStore.userId) {
      sdk.getLobbyForUser(this.authStore.userId).then(this.setLobby).catch(this.setError);
    }
  }

  onLeftLobby() {
    this.setLobby();
    this.setError();
  }

  @computed
  get startLobbyCountdown() {
    if (this.isLobbyOwner && !this.isLobbyCountdownStarted) {
      return () => sdk.startLobbyCountdown();
    }

    return undefined;
  }

  @computed
  get stopLobbyCountdown() {
    if (this.lobby && this.lobby.isCountingDown) {
      return () => sdk.stopLobbyCountdown();
    }

    return undefined;
  }

  joinLobby(lobbyId) {
    this.setError();
    sdk.joinLobby(lobbyId)
      .then(this.setLobby)
      .catch(this.setError);
  }

  leaveLobby() {
    if (this.lobby) {
      sdk.leaveLobby().then(() => {
        this.setLobby();
        this.setError();
        this.routerStore.navigate('landing');
      });
    }
  }
}
