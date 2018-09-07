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

  @computed
  get currentTurnUser() {
    return this.lobby && this.lobby.pickCurrentTurnUser(this.users);
  }

  @computed
  get isOwnTurn() {
    return this.currentTurnUser && this.currentTurnUser.id === this.authStore.userId;
  }

  constructor(authStore) {
    this.authStore = authStore;

    sdk.onJoinedLobby(this.setLobby);
    sdk.onLeftLobby(() => this.setLobby(null));
    sdk.onUserJoinedLobby(this.addUser);
    sdk.onUserLeftLobby(this.removeUser);
    sdk.onLobbyStarted((lby) => {
      this.setLobby(lby);
      this.getUsers(lby);
    });
    sdk.onTurnEnded(this.setLobby);
    sdk.onLobbyCountdownStarted(this.setLobby);
    sdk.onLobbyCountdownStopped(this.setLobby);

    autorun(this.getCurrentLobby);
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
    const previousId = this.lobby && this.lobby.id;

    this.lobby = lobby;

    if (lobby && lobby.id !== previousId) {
      this.getUsers();
    }
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
    if (this.lobby && this.lobby.isCountingDown) {
      return () => sdk.stopLobbyCountdown();
    }

    return undefined;
  }

  @computed
  get endTurn() {
    if (this.isOwnTurn) {
      return () => sdk.endTurn();
    }

    return undefined;
  }

  joinLobby(lobbyId) {
    if (!this.lobby) {
      this.setError();
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

  @action
  updateUser(user) {
    const idx = this.users.findIndex((u) => u.id === user.id);

    this.users[idx] = user;
  }

  getUsers() {
    if (this.lobby) {
      sdk.getUsersInLobby(this.lobby.id).then(this.setUsers).catch(this.setError);
    } else {
      this.setUsers();
    }
  }
}
