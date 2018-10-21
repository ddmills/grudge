import 'source-map-support/register';
import config from 'config';
import Logger from 'utilities/Logger';
import WebServer from 'web/WebServer';
import WebApp from 'web/WebApp';
import SocketServer from 'socket/SocketServer';
import SocketApp from 'socket/SocketApp';

const logServerStarted = () => {
  const location = `${config.server.protocol}://${config.server.host}:${config.server.port}`;

  Logger.info(`Serving on ${location}`);
};

export const start = () => {
  const webServer = WebServer(WebApp());
  const socketServer = SocketServer(webServer);

  webServer.listen(config.server.port, logServerStarted);
  SocketApp(socketServer);
};
