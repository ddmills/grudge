import SocketEmitter from 'providers/socketio/SocketEmitter';
import UserLobbyRepository from 'repositories/UserLobbyRepository';
import * as Events from '@grudge/api-events';
import autobind from 'autobind-decorator';

setInterval(() => {
  SocketEmitter.emit(Events.FLASH, Date.now());
}, 60000);

@autobind
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

  static onLobbyCountdownStarted(lobby) {
    this.notifyLobby(lobby.id, Events.LOBBY_COUNTDOWN_STARTED, lobby.properties);
  }

  static onLobbyCountdownStopped(lobby) {
    this.notifyLobby(lobby.id, Events.LOBBY_COUNTDOWN_STOPPED, lobby.properties);
  }

  static onLobbyStarted(lobby) {
    this.notifyLobby(lobby.id, Events.LOBBY_STARTED, lobby.properties);
  }

  static onTurnEnded(lobby) {
    this.notifyLobby(lobby.id, Events.LOBBY_TURN_ENDED, lobby.properties);
  }

  static onCardDrawn(user, card) {
    this.notifyUser(user.id, Events.CARD_DRAWN, card.properties);
  }

  static onCardDiscarded(user, card) {
    this.notifyUser(user.id, Events.CARD_DISCARDED, card.properties);
  }
}
