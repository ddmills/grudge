import { CONNECTION, DISCONNECT } from 'socket/SocketEvents';
import Logger from 'utilities/Logger';
import SocketAuthMiddleware from 'socket/middleware/SocketAuthMiddleware';

export default function createApp(io) {
  io.use(SocketAuthMiddleware());
  io.on(CONNECTION, (socket) => {
    Logger.info('Socket Connected', socket.userId);

    socket.on(DISCONNECT, () => Logger.info('Socket disconnected', socket.userId));
  });
}
