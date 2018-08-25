import LobbyListScreen from 'screens/LobbyList/LobbyListScreen';
import Route from 'screens/Route';

export default class LobbyListRoute extends Route {
  name = 'lobbies';

  path = '/lobbies';

  isAuthRequired = false;

  Component = LobbyListScreen;
}
