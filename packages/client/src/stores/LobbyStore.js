import { autorun, action, observable } from 'mobx';
import autobind from 'autobind-decorator';
import sdk from '@grudge/sdk';

export default class LobbyStore {
  @observable
  lobby = null;

  @observable
  users = [];

  @observable
  error = null;

  constructor(authStore) {
    this.authStore = authStore;

    sdk.onUserJoinedLobby(this.addUser);
    sdk.onUserLeftLobby(this.removeUser);

    autorun(this.getCurrentLobby);
    autorun(this.getUsers);
  }

  @autobind
  @action
  setUsers(users = []) {
    this.users.replace(users);
  }

  @autobind
  @action
  addUser(user) {
    this.users.push(user);
  }

  @autobind
  @action
  removeUser(user) {
    const filteredUsers = this.users.filter((item) => item.id !== user.id);

    this.setUsers(filteredUsers);
  }

  @autobind
  @action
  setError(error = null) {
    this.error = error;
  }

  @autobind
  @action
  setLobby(lobby = null) {
    this.lobby = lobby;
  }

  @autobind
  getCurrentLobby() {
    if (this.authStore.userId) {
      sdk.getLobbyForUser(this.authStore.userId).then(this.setLobby).catch(this.setError);
    }
  }

  @action
  joinLobby(lobbyId) {
    if (!this.lobby) {
      sdk.joinLobby(lobbyId).then(this.setLobby).catch(this.setError);
    }
  }

  @autobind
  @action
  leaveLobby() {
    if (this.lobby) {
      sdk.leaveLobby().then(action(() => {
        this.lobby = undefined;
        this.error = undefined;
        this.setUsers();
      }));
    }
  }

  @autobind
  getUsers() {
    if (this.lobby) {
      sdk.getUsersInLobby(this.lobby.id).then(this.setUsers);
    } else {
      this.setUsers();
    }
  }
}
