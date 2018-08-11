import { CONNECTION, DISCONNECT } from 'socket/SocketEvents';
import Logger from 'utilities/Logger';

export default function createApp(io) {
  io.on(CONNECTION, (socket) => {
    Logger.info('Socket Connected');

    socket.on(DISCONNECT, () => Logger.info('Socket disconnected'));
  });
}
