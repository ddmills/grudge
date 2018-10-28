import GameScreen from 'screens/Game/GameScreen';
import Route from 'screens/Route';

export default class GameRoute extends Route {
  name = 'game';

  path = '/play/:contextId';

  isAuthRequired = true;

  Component = GameScreen;

  static onActivated({ contextStore }, { contextId }) {
    contextStore.joinContext(contextId);
  }
}
