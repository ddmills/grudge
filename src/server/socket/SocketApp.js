import { CONNECTION } from 'socket/SocketEvents';
import Logger from 'utilities/Logger';

export default function createApp(io) {
  io.on(CONNECTION, () => Logger.info('Socket Connected'));
}
