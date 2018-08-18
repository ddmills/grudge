import { PureComponent } from 'react';
import { Provider } from 'mobx-react';
import Router from 'screens/Router';
import stores from './boot/stores';

export default class App extends PureComponent {
  render() {
    return (
      <Provider {...stores}>
        <Router/>
      </Provider>
    );
  }
}
