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

  constructor() {
    autorun(() => this.getUsers());
    sdk.onUserJoinedLobby((user) => {
      this.users.push(user);
    });
    sdk.onUserLeftLobby((user) => {
      const filteredUsers = this.users.filter((item) => item.id !== user.id);

      this.users.replace(filteredUsers);
    });
  }

  @action
  joinLobby(lobbyId) {
    if (this.lobby) {
      return;
    }

    this.error = undefined;
    this.lobby = null;
    this.users = [];

    sdk.joinLobby(lobbyId).then(action((lobby) => {
      this.lobby = lobby;
      this.getUsers();
    })).catch(action((error) => {
      this.error = error;
    }));
  }

  @autobind
  @action
  leaveLobby() {
    if (this.lobby) {
      sdk.leaveLobby().then(action(() => {
        this.lobby = undefined;
        this.error = undefined;
        this.users = [];
      }));
    }
  }

  @autobind
  @action
  getUsers() {
    if (!this.lobby) {
      this.users = [];
      return;
    }

    sdk.getUsersInLobby(this.lobby.id).then(action((users) => {
      this.users = users;
    }));
  }
}
