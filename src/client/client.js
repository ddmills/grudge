import App from 'components/App/App';
import ReactDom from 'react-dom';
import io from 'socket.io-client'; // eslint-disable-line import/no-extraneous-dependencies
import { Provider } from 'mobx-react';
import CounterStore from './stores/CounterStore';
import registerServiceWorker from './register-service-worker';

io.connect();

registerServiceWorker();

const stores = {
  counterStore: new CounterStore(),
};

ReactDom.render((
  <Provider {...stores}>
    <App/>
  </Provider>
), document.getElementById('app'));
