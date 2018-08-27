import LobbyScreen from 'screens/Lobby/LobbyScreen';
import Route from 'screens/Route';

export default class LobbyRoute extends Route {
  name = 'lobby';

  path = '/lobby/:lobbyId';

  isAuthRequired = true;

  Component = LobbyScreen;

  static onActivated({ lobbyStore }, { lobbyId }) {
    lobbyStore.getLobby(lobbyId);
  }
}
