import App from 'components/App/App';
import ReactDom from 'react-dom';
import io from 'socket.io-client'; // eslint-disable-line import/no-extraneous-dependencies
import registerServiceWorker from './register-service-worker';

io.connect();

registerServiceWorker();

ReactDom.render(<App/>, document.getElementById('app'));
