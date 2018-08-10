import config from 'config';
import Logger from 'utilities/Logger';
import WebServer from 'web/WebServer';
import App from './App';

const app = App();
const webServer = WebServer(app);

webServer.listen(config.server.port, () => {
  const location = `${config.server.protocol}://${config.server.host}:${config.server.port}`;

  Logger.info(`Serving on ${location}`);
});
