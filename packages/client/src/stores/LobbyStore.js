import { action, observable } from 'mobx';
import sdk from '@grudge/sdk';

export default class LobbyStore {
  @observable
  lobby = null;

  @observable
  error = null;

  joinLobby(lobbyId) {
    this.error = undefined;
    this.lobby = undefined;
    sdk.joinLobby(lobbyId).then(action((lobby) => {
      this.lobby = lobby;
    })).catch(action((error) => {
      this.error = error;
    }));
  }
}
