import { action, observable } from 'mobx';
import sdk from '@grudge/sdk';

export default class LobbyStore {
  @observable
  lobby = null;

  getLobby(lobbyId) {
    sdk.getLobby(lobbyId).then(action((lobby) => {
      this.lobby = lobby;
    }));
  }
}
