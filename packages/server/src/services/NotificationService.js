import * as Events from '@grudge/api-events';
import { Model } from '@grudge/domain';
import { ContextInterrogator } from '@grudge/domain/interpreters';
import SocketEmitter from 'providers/socketio/SocketEmitter';
import autobind from 'autobind-decorator';
import Logger from 'utilities/Logger';

setInterval(() => {
  SocketEmitter.emit(Events.FLASH, Date.now());
}, 60000);

@autobind
export default class NotificationService {
  static notifyUser(userId, event, ...data) {
    Logger.info('emit', event, userId, ...data);
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

  static notifyContext(ctx, event, ...data) {
    ctx.players.forEach((player) => {
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

  static onCardEnabled(ctx, cardId) {
    this.notifyContext(ctx, Events.CARD_ENABLED, cardId);
  }

  static onCardDisabled(ctx, cardId) {
    this.notifyContext(ctx, Events.CARD_DISABLED, cardId);
  }

  static onPlayerMoneyUpdated(ctx, playerId, value) {
    this.notifyContext(ctx, Events.PLAYER_MONEY_UPDATED, playerId, value);
  }

  static onPlayerHealthUpdated(ctx, playerId, value) {
    this.notifyContext(ctx, Events.PLAYER_HEALTH_UPDATED, playerId, value);
  }

  static onTraitAddedToCard(ctx, cardId, trait) {
    this.notifyContext(ctx, Events.CARD_TRAIT_ADDED, cardId, trait);
  }

  static onTraitRemovedFromCard(ctx, cardId, traitId) {
    this.notifyContext(ctx, Events.CARD_TRAIT_REMOVED, cardId, traitId);
  }

  static onCardTrashed(ctx, cardId) {
    this.notifyContext(ctx, Events.CARD_TRASHED, cardId);
  }

  static onCardKilled(ctx, cardId) {
    this.notifyContext(ctx, Events.CARD_KILLED, cardId);
  }

  static onContextEnded(ctx) {
    const winner = ContextInterrogator.getWinnerPlayer(ctx);

    this.notifyContext(ctx, Events.CONTEXT_ENDED, winner.id, ctx.endedAt);
  }

  static onPlayerJoined(ctx, player) {
    this.notifyContext(ctx, Events.PLAYER_JOINED, player);
    this.notifyPlayer(player, Events.CONTEXT_JOINED, ctx);
  }

  static onPlayerLeft(ctx, player) {
    this.notifyContext(ctx, Events.PLAYER_LEFT, player.id);
    this.notifyPlayer(player, Events.CONTEXT_LEFT);
  }

  static onCountdownStarted(ctx) {
    this.notifyContext(ctx, Events.CONTEXT_COUNTDOWN_STARTED, ctx.countdownStartedAt);
  }

  static onCountdownStopped(ctx) {
    this.notifyContext(ctx, Events.CONTEXT_COUNTDOWN_STOPPED);
  }

  static onContextStarted(ctx) {
    this.notifyContext(ctx, Events.CONTEXT_STARTED, ctx);
  }

  static onCardDrawn(ctx, cardId) {
    const player = ContextInterrogator.getPlayerForCard(ctx, cardId);

    this.notifyPlayer(player, Events.CARD_DRAWN, cardId);
  }

  static onTurnEnded(ctx) {
    this.notifyContext(ctx, Events.CONTEXT_TURN_ENDED, ctx.currentTurn, ctx.turnStartedAt);
  }
}
