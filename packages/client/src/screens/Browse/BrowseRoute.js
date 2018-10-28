import BrowseScreen from 'screens/Browse/BrowseScreen';
import BrowseStore from 'screens/Browse/BrowseStore';
import Route from 'screens/Route';

export default class BrowseRoute extends Route {
  name = 'browse';

  path = '/browse';

  isAuthRequired = true;

  Component = BrowseScreen;

  static storeName = 'browseStore';

  static createStore({ routerStore }) {
    return new BrowseStore(routerStore);
  }

  static onActivated({ browseStore }) {
    browseStore.refreshContexts();
  }
}
