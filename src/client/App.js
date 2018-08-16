import { Component } from 'react';
import { Provider } from 'mobx-react';
import Router from 'screens/Router';
import initializeStores from './boot/initialize-stores';

export default class App extends Component {
  componentWillMount() {
    this.stores = initializeStores();
  }

  render() {
    return (
      <Provider {...this.stores}>
        <Router/>
      </Provider>
    );
  }
}
