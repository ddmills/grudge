import LobbyScreen from 'screens/Lobby/LobbyScreen';
import LobbyStore from 'screens/Lobby/LobbyStore';
import Route from 'screens/Route';

export default class LobbyRoute extends Route {
  name = 'lobbies';

  path = '/lobbies';

  isAuthRequired = true;

  Component = LobbyScreen;

  storeName = 'LobbyStore';

  static createStore() {
    return new LobbyStore();
  }

  static onActivated(lobbyStore) {
    lobbyStore.refreshLobbies();
  }
}
