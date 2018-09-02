import SocketEmitter from 'providers/socketio/SocketEmitter';
import UserLobbyRepository from 'repositories/UserLobbyRepository';
import * as Events from '@grudge/api-events';

setInterval(() => {
  SocketEmitter.emit(Events.FLASH, Date.now());
}, 60000);

export default class NotificationService {
  static notifyUser(userId, event, data) {
    SocketEmitter.to(userId).emit(event, data);
  }

  static async notifyLobby(lobbyId, event, data) {
    const userIds = await UserLobbyRepository.findForLobby(lobbyId);

    userIds.forEach((userId) => {
      this.notifyUser(userId, event, data);
    });
  }

  static onUserJoinedLobby(lobby, user) {
    this.notifyLobby(lobby.id, Events.LOBBY_USER_JOINED, user.properties);
    this.notifyUser(user.id, Events.LOBBY_JOINED, lobby.properties);
  }

  static onUserLeftLobby(lobby, user) {
    this.notifyLobby(lobby.id, Events.LOBBY_USER_LEFT, user.properties);
    this.notifyUser(user.id, Events.LOBBY_LEFT, lobby.properties);
  }
}
