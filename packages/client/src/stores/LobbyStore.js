import { action, observable } from 'mobx';
import sdk from '@grudge/sdk';

export default class LobbyStore {
  @observable
  lobby = null;

  joinLobby(lobbyId) {
    sdk.joinLobby(lobbyId).then(action((lobby) => {
      this.lobby = lobby;
    }));
  }
}
