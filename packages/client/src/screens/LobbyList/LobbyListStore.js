import { action, observable } from 'mobx';
import sdk from '@grudge/sdk';
import autobind from 'autobind-decorator';

export default class LobbyListStore {
  @observable
  lobbies = [];

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
      this.lobbies.unshift(lobby);
    }));
  }
}
