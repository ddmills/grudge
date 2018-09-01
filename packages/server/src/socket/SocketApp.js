import { CONNECTION, DISCONNECT } from 'socket/SocketEvents';
import SocketAuthMiddleware from 'socket/middleware/SocketAuthMiddleware';
import UserMiddleware from 'socket/middleware/UserMiddleware';
import LoggingMiddleware from 'socket/middleware/LoggingMiddleware';
import Logger from 'utilities/Logger';
import SocketRouter from './SocketRouter';

export default function createApp(io) {
  io.use(LoggingMiddleware());
  io.use(SocketAuthMiddleware());
  io.use(UserMiddleware());

  io.on(CONNECTION, (socket) => {
    SocketRouter.attachListeners(socket);

    socket.on(DISCONNECT, () => Logger.info('Authenticated Socket Disconnected', socket.userId));
  });
}
