import SocketEmitter from 'providers/socketio/SocketEmitter';
import * as Events from '@grudge/api-events';
import { Model } from '@grudge/domain';
import autobind from 'autobind-decorator';
import Logger from 'utilities/Logger';

setInterval(() => {
  SocketEmitter.emit(Events.FLASH, Date.now());
}, 60000);

@autobind
export default class NotificationService {
  static notifyUser(userId, event, ...data) {
    Logger.info('emit', event, userId);
    SocketEmitter.to(userId).emit(event, ...data);
  }

  static async notifyLobby(lobbyId, event, data) {

  }

  static notifyPlayer(player, event, ...data) {
    if (player.isBot) return;

    const serialized = data.map((d) => {
      return d instanceof Model ? d.serialize(player.userId) : d;
    });

    this.notifyUser(player.userId, event, ...serialized);
  }

  static notifyContext(context, event, ...data) {
    context.players.forEach((player) => {
      this.notifyPlayer(player, event, ...data);
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

  static onCardDiscarded(user, card) {
    this.notifyUser(user.id, Events.CARD_DISCARDED, card.properties);
  }

  static onCardPlayed(ctx, cardId, targetSlotIndex) {
    this.notifyContext(ctx, Events.CARD_PLAYED, cardId, targetSlotIndex);
  }

  static onCardEnabled(context, cardId) {
    this.notifyContext(context, Events.CARD_ENABLED, cardId);
  }

  static onCardDisabled(context, cardId) {
    this.notifyContext(context, Events.CARD_DISABLED, cardId);
  }

  static onMoneyUpdated(context, playerId, amount) {
    this.notifyContext(context, Events.USER_MONEY_UPDATED, playerId, amount);
  }

  static onHealthUpdated(lobby, user) {
    this.notifyLobby(lobby.id, Events.USER_HEALTH_UPDATED, user.properties);
  }

  static onTraitAddedToCard(context, cardId, trait) {
    this.notifyContext(context, Events.CARD_TRAIT_ADDED, cardId, trait);
  }

  static onTraitRemovedFromCard(context, cardId, traitId) {
    this.notifyContext(context, Events.CARD_TRAIT_REMOVED, cardId, traitId);
  }

  static onCardTrashed(ctx, cardId) {
    this.notifyContext(ctx, Events.CARD_TRASHED, cardId);
  }

  static onCardKilled(context, cardId) {
    this.notifyContext(context, Events.CARD_KILLED, cardId);
  }

  static onLobbyEnded(lobby) {
    this.notifyLobby(lobby.id, Events.LOBBY_ENDED, lobby.properties);
  }

  static onPlayerJoined(context, player) {
    this.notifyContext(context, Events.PLAYER_JOINED, player);
    this.notifyPlayer(player, Events.CONTEXT_JOINED, context);
  }

  static onPlayerLeft(context, player) {
    this.notifyContext(context, Events.PLAYER_LEFT, player);
    this.notifyPlayer(player, Events.CONTEXT_LEFT, context);
  }

  static onCountdownStarted(context) {
    this.notifyContext(context, Events.CONTEXT_COUNTDOWN_STARTED, context);
  }

  static onCountdownStopped(context) {
    this.notifyContext(context, Events.CONTEXT_COUNTDOWN_STOPPED, context);
  }

  static onContextStarted(context) {
    this.notifyContext(context, Events.CONTEXT_STARTED, context);
  }

  static onCardDrawn(context, card) {
    const player = context.getPlayer(card.playerId);

    this.notifyPlayer(player, Events.CARD_DRAWN, card);
  }

  static onTurnEnded(context) {
    this.notifyContext(context, Events.CONTEXT_TURN_ENDED, context);
  }
}
