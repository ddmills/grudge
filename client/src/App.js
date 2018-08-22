import { PureComponent } from 'react';
import { Provider } from 'mobx-react';
import Router from 'screens/Router';
import Stores from 'boot/Stores';
import Routes from 'boot/Routes';

export default class App extends PureComponent {
  componentWillMount() {
    const rootStores = Stores();
    const routes = Routes(rootStores);

    this.stores = {
      ...rootStores,
      ...routes.reduce((routeStores, route) => ({
        ...routeStores,
        [route.storeName]: route.store,
      }), {}),
    };

    this.stores.routerStore.start(routes);
  }

  render() {
    return (
      <Provider {...this.stores}>
        <Router/>
      </Provider>
    );
  }
}
