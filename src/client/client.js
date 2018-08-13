import ReactDom from 'react-dom';
import io from 'socket.io-client'; // eslint-disable-line import/no-extraneous-dependencies
import { Provider } from 'mobx-react';
import registerServiceWorker from './boot/register-service-worker';
import initializeStores from './boot/initialize-stores';
import App from './App';

io.connect();

registerServiceWorker();

const stores = initializeStores();

ReactDom.render((
  <Provider {...stores}>
    <App/>
  </Provider>
), document.getElementById('app'));
