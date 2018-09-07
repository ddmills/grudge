import LobbyListScreen from 'screens/LobbyList/LobbyListScreen';
import LobbyListStore from 'screens/LobbyList/LobbyListStore';
import Route from 'screens/Route';

export default class LobbyListRoute extends Route {
  name = 'lobbies';

  path = '/lobbies';

  isAuthRequired = true;

  Component = LobbyListScreen;

  static storeName = 'lobbyListStore';

  static createStore({ routerStore }) {
    return new LobbyListStore(routerStore);
  }

  static onActivated({ lobbyListStore }) {
    lobbyListStore.refreshLobbies();
  }
}
