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
  users = [];

  @observable
  error = null;

  @observable
  timer = new MobXCountdownTimer();

  @computed
  get isLobbyOwner() {
    return this.lobby && this.lobby.ownerId === this.authStore.userId;
  }

  @computed
  get isLobbyCountdownStarted() {
    return this.lobby && this.lobby.isCountdownStarted;
  }

  constructor(authStore) {
    this.authStore = authStore;

    sdk.onJoinedLobby(this.setLobby);
    sdk.onLeftLobby(() => this.setLobby(null));
    sdk.onUserJoinedLobby(this.addUser);
    sdk.onUserLeftLobby(this.removeUser);
    sdk.onLobbyStarted(this.setLobby);
    sdk.onLobbyCountdownStarted(this.setLobby);
    sdk.onLobbyCountdownStopped(this.setLobby);

    autorun(this.getCurrentLobby);
    autorun(this.getUsers);
    autorun(this.configureTimer);
  }

  @action
  setUsers(users = []) {
    this.users.replace(users);
  }

  @action
  setError(error = null) {
    this.error = error;
  }

  @action
  addUser(user) {
    this.users.push(user);
  }

  @action
  removeUser(user) {
    const filteredUsers = this.users.filter((item) => item.id !== user.id);

    this.setUsers(filteredUsers);
  }

  @action
  setLobby(lobby = null) {
    this.lobby = lobby;
  }

  configureTimer() {
    if (this.isLobbyCountdownStarted) {
      this.timer.start(this.lobby.countdownStartedAtMs, this.lobby.countdownDuration);
    } else {
      this.timer.reset();
    }
  }

  getCurrentLobby() {
    if (this.authStore.userId) {
      sdk.getLobbyForUser(this.authStore.userId).then(this.setLobby).catch(this.setError);
    }
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
    if (this.isLobbyCountdownStarted) {
      return () => sdk.stopLobbyCountdown();
    }

    return undefined;
  }

  joinLobby(lobbyId) {
    if (!this.lobby) {
      sdk.joinLobby(lobbyId).then(this.setLobby).catch(this.setError);
    }
  }

  leaveLobby() {
    if (this.lobby) {
      sdk.leaveLobby().then(() => {
        this.setLobby();
        this.setError();
        this.setUsers();
      });
    }
  }

  getUsers() {
    if (this.lobby) {
      sdk.getUsersInLobby(this.lobby.id).then(this.setUsers);
    } else {
      this.setUsers();
    }
  }
}
