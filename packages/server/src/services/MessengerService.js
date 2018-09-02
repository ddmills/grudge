import SocketEmitter from 'providers/socketio/SocketEmitter';
import * as Events from '@grudge/api-events';

setInterval(() => {
  SocketEmitter.emit(Events.FLASH, Date.now());
}, 20000);

export default class MessengerService {
  static onUserJoinedLobby(lobbyId, user) {
    SocketEmitter.to(lobbyId).emit(Events.LOBBY_USER_JOINED, user.properties);
  }
}
