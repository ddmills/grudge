import config from 'config';
import Logger from 'utilities/Logger';
import App from './App';
import Server from './Server';

Server(App()).listen(config.server.port, () => {
  const location = `${config.server.protocol}://${config.server.host}:${config.server.port}`;

  Logger.info(`Serving on ${location}`);
});
