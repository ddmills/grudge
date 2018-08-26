import { CONNECTION, DISCONNECT } from 'socket/SocketEvents';
import SocketAuthMiddleware from 'socket/middleware/SocketAuthMiddleware';
import UserMiddleware from 'socket/middleware/UserMiddleware';
import Logger from 'utilities/Logger';
import UserController from 'socket/controllers/UserController';
import LobbyController from 'socket/controllers/LobbyController';
import * as Events from '@grudge/api-events';

export default function createApp(io) {
  io.use(SocketAuthMiddleware());
  io.use(UserMiddleware());

  io.on(CONNECTION, (socket) => {
    Logger.info('Authenticated Socket Connected', socket.user.name);

    socket.on(Events.USER_GET, UserController.get);
    socket.on(Events.LOBBY_GET, LobbyController.get);
    socket.on(Events.LOBBY_CREATE, LobbyController.create);

    socket.on(DISCONNECT, () => Logger.info('Authenticated Socket Disconnected', socket.user.name));
  });
}
