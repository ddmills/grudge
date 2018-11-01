import SocketEmitter from 'providers/socketio/SocketEmitter';
import UserLobbyRepository from 'repositories/UserLobbyRepository';
import * as Events from '@grudge/api-events';
import autobind from 'autobind-decorator';
import Logger from 'utilities/Logger';

setInterval(() => {
  SocketEmitter.emit(Events.FLASH, Date.now());
}, 60000);

@autobind
export default class NotificationService {
  static notifyUser(userId, event, data) {
    Logger.info('emit', event, userId, data && data.id);
    SocketEmitter.to(userId).emit(event, data);
  }

  static async notifyLobby(lobbyId, event, data) {
    const userIds = await UserLobbyRepository.findForLobby(lobbyId);

    userIds.forEach((userId) => {
      this.notifyUser(userId, event, data);
    });
  }

  static async notifyPlayer(playerId, event, data) {
    Logger.info('emit', event, playerId, data ? data.id : 'NO DATA');
    SocketEmitter.to(playerId).emit(event, data);
  }

  static async notifyContext(context, event, data) {
    context.players.forEach((player) => {
      this.notifyPlayer(player.id, event, data);
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

  static onCardPlayed(lobby, card) {
    this.notifyLobby(lobby.id, Events.CARD_PLAYED, card.properties);
  }

  static onMoneyUpdated(lobby, user) {
    this.notifyLobby(lobby.id, Events.USER_MONEY_UPDATED, user.properties);
  }

  static onHealthUpdated(lobby, user) {
    this.notifyLobby(lobby.id, Events.USER_HEALTH_UPDATED, user.properties);
  }

  static onCardTraitAdded(lobby, card) {
    this.notifyLobby(lobby.id, Events.CARD_TRAIT_ADDED, card.properties);
  }

  static onCardTraitRemoved(lobby, card) {
    this.notifyLobby(lobby.id, Events.CARD_TRAIT_REMOVED, card.properties);
  }

  static onCardTrashed(lobby, card) {
    this.notifyLobby(lobby.id, Events.CARD_TRASHED, card.properties);
  }

  static onCardKilled(lobby, card) {
    this.notifyLobby(lobby.id, Events.CARD_KILLED, card.properties);
  }

  static onLobbyEnded(lobby) {
    this.notifyLobby(lobby.id, Events.LOBBY_ENDED, lobby.properties);
  }

  static onPlayerJoined(context, player) {
    this.notifyContext(context, Events.CONTEXT_PLAYER_JOINED, player.serialize());
    this.notifyPlayer(player.id, Events.CONTEXT_JOINED, context.serialize());
  }

  static onPlayerLeft(context, player) {
    this.notifyContext(context, Events.CONTEXT_PLAYER_LEFT, player.serialize());
    this.notifyPlayer(player.id, Events.CONTEXT_LEFT, context.serialize());
  }

  static onCountdownStarted(context) {
    this.notifyContext(context, Events.CONTEXT_COUNTDOWN_STARTED, context.serialize());
  }

  static onCountdownStopped(context) {
    this.notifyContext(context, Events.CONTEXT_COUNTDOWN_STOPPED, context.serialize());
  }
}
