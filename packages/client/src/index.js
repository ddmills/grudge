import ReactDom from 'react-dom';
// import registerServiceWorker from './boot/register-service-worker';
import App from './App';
import './styles/client.scss';

// registerServiceWorker();

ReactDom.render(<App/>, document.getElementById('app'));
