import { action, observable } from 'mobx';
import sdk from '@grudge/sdk';
import autobind from 'autobind-decorator';

export default class LobbyListStore {
  @observable
  lobbies = [];

  constructor(routerStore) {
    this.routerStore = routerStore;
  }

  @autobind
  @action
  refreshLobbies() {
    this.lobbies = [];
    sdk.listLobbies().then(action((lobbies) => {
      this.lobbies = lobbies;
    }));
  }

  @autobind
  createLobby() {
    sdk.createLobby().then(action((lobby) => {
      this.routerStore.navigate('lobby', { lobbyId: lobby.id });
      this.lobbies.unshift(lobby);
    }));
  }
}
