import LobbyListScreen from 'screens/LobbyList/LobbyListScreen';
import LobbyListStore from 'screens/LobbyList/LobbyListStore';
import Route from 'screens/Route';

export default class LobbyListRoute extends Route {
  name = 'lobbies';

  path = '/lobbies';

  isAuthRequired = true;

  Component = LobbyListScreen;

  storeName = 'lobbyListStore';

  static createStore() {
    return new LobbyListStore();
  }

  static onActivated(lobbyListStore) {
    lobbyListStore.refreshLobbies();
  }
}
