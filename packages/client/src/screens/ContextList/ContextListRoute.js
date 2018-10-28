import ContextListScreen from 'screens/ContextList/ContextListScreen';
import ContextListStore from 'screens/ContextList/ContextListStore';
import Route from 'screens/Route';

export default class ContextListRoute extends Route {
  name = 'contexts';

  path = '/browse';

  isAuthRequired = true;

  Component = ContextListScreen;

  static storeName = 'contextListStore';

  static createStore({ routerStore }) {
    return new ContextListStore(routerStore);
  }

  static onActivated({ contextListStore }) {
    contextListStore.refreshContexts();
  }
}
