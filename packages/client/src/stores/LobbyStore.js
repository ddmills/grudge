import { autorun, action, observable } from 'mobx';
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
  }

  joinLobby(lobbyId) {
    this.error = undefined;
    this.lobby = undefined;
    this.users = [];

    sdk.joinLobby(lobbyId).then(action((lobby) => {
      this.lobby = lobby;
    })).catch(action((error) => {
      this.error = error;
    }));
  }

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
