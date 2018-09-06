import { autorun, action, observable } from 'mobx';
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
  timer = new MobXCountdownTimer(12000);

  constructor(authStore) {
    this.authStore = authStore;

    sdk.onJoinedLobby(this.setLobby);
    sdk.onLeftLobby(() => this.setLobby(null));
    sdk.onUserJoinedLobby(this.addUser);
    sdk.onUserLeftLobby(this.removeUser);
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
    if (this.lobby && this.lobby.countdownStartedAt) {
      this.timer.start(this.lobby.countdownStartedAtMs);
    } else {
      this.timer.reset();
    }
  }

  getCurrentLobby() {
    if (this.authStore.userId) {
      sdk.getLobbyForUser(this.authStore.userId).then(this.setLobby).catch(this.setError);
    }
  }

  startLobbyCountdown = () => sdk.startLobbyCountdown();

  stopLobbyCountdown = () => sdk.stopLobbyCountdown();

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
