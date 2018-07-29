import config from 'config';
import App from './App';
import Server from './Server';

const app = App();
const server = Server(app);

server.listen(config.server.port, () => {
  const location = `${config.server.protocol}://${config.server.host}:${config.server.port}`;

  console.log(`Serving on ${location}`); // eslint-disable-line no-console
});
