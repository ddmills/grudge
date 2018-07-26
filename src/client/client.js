import App from 'components/App/App';
import ReactDom from 'react-dom';
import registerServiceWorker from './register-service-worker';

registerServiceWorker();

ReactDom.render(<App/>, document.getElementById('app'));
