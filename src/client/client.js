import ReactDom from 'react-dom';
import io from 'socket.io-client'; // eslint-disable-line import/no-extraneous-dependencies
import registerServiceWorker from './boot/register-service-worker';
import App from './App';

io.connect();

registerServiceWorker();

ReactDom.render(<App/>, document.getElementById('app'));
