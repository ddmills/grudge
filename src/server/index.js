import config from 'config';
import Logger from 'utilities/Logger';
import App from './App';
import Server from './Server';

const app = App();
const server = Server(app);

server.listen(config.server.port, () => {
  const location = `${config.server.protocol}://${config.server.host}:${config.server.port}`;

  Logger.info(`Serving on ${location}`);
});
