import { CardLocations, TraitIds, CardTypes } from '@grudge/data';
import ReferenceResolver from './ReferenceResolver';

export default class ContextInterrogator {
  static isCountdownStarted(ctx) {
    if (!ctx) return false;
    return Boolean(ctx.countdownStartedAt);
  }

  static isEnded(ctx) {
    if (!ctx) return false;
    return Boolean(ctx.endedAt);
  }

  static isStarted(ctx) {
    if (!ctx) return false;
    return Boolean(ctx.startedAt);
  }

  static isRunning(ctx) {
    if (!ctx) return false;
    return this.isStarted(ctx) && !this.isEnded(ctx);
  }

  static isSettingUp(ctx) {
    if (!ctx) return false;
    return !this.isStarted(ctx) && !this.isEnded(ctx);
  }

  static isCountingDown(ctx) {
    if (!ctx) return false;
    return this.isCountdownStarted(ctx) && !this.isStarted(ctx);
  }

  static isFull(ctx) {
    if (!ctx) return false;
    return ctx.players.length >= ctx.maxNumberOfPlayers;
  }

  static turnStartedAtMs(ctx) {
    if (ctx && ctx.turnStartedAt) {
      return (new Date(ctx.turnStartedAt)).getTime();
    }

    return -1;
  }

  static currentTurnPlayer(ctx) {
    if (!ctx) return;
    if (!this.isRunning(ctx)) return;

    const turnId = ctx.currentTurn % ctx.players.length;

    return ctx.players.find((p) => p.turnOrder === turnId);
  }

  static isPlayersTurn(ctx, playerId) {
    if (!ctx) return false;
    const currentTurnPlayer = this.currentTurnPlayer(ctx);

    return Boolean(currentTurnPlayer && currentTurnPlayer.id === playerId);
  }

  static isUsersTurn(ctx, userId) {
    if (!ctx) return false;
    const player = this.getPlayerForUser(ctx, userId);

    return Boolean(player && this.isPlayersTurn(ctx, player.id));
  }

  static isUserOwner(ctx, userId) {
    if (!ctx) return false;
    return ctx.ownerId === userId;
  }

  static getPlayers(ctx) {
    if (!ctx) return [];
    return ctx.players;
  }

  static getPlayer(ctx, playerId) {
    if (!ctx) return;
    return ctx.players.find((p) => p.id === playerId);
  }

  static getPlayerForUser(ctx, userId) {
    if (!ctx) return;
    return userId ? ctx.players.find((p) => p.userId === userId) : undefined;
  }

  static getCard(ctx, cardId) {
    if (!ctx) return;
    return ctx.cards.find((c) => c.id === cardId);
  }

  static getCardTypeForCard(ctx, cardId) {
    if (!ctx) return;
    const card = this.getCard(ctx, cardId);

    return CardTypes[card.cardTypeId];
  }

  static isCardPlayed(ctx, cardId) {
    const card = this.getCard(ctx, cardId);
    if (!card) return false;

    return card.location === CardLocations.ARENA;
  }

  static isCardDiscarded(ctx, cardId) {
    const card = this.getCard(ctx, cardId);
    if (!card) return false;

    return card.location === CardLocations.DISCARD;
  }

  static isCardTrashed(ctx, cardId) {
    const card = this.getCard(ctx, cardId);
    if (!card) return false;

    return card.location === CardLocations.TRASH;
  }

  static isCardDisabled(ctx, cardId) {
    const card = this.getCard(ctx, cardId);
    if (!card) return false;

    return card.isDisabled;
  }

  static isCardEnabled(ctx, cardId) {
    return !this.isCardDisabled(ctx, cardId);
  }

  static isCardInHand(ctx, cardId) {
    const card = this.getCard(ctx, cardId);
    if (!card) return false;

    return card.location === CardLocations.HAND;
  }

  static isCardOwnedBy(ctx, cardId, playerId) {
    if (!ctx) return [];
    const card = this.getCard(ctx, cardId);

    return card ? card.playerId === playerId : false;
  }

  static isCardDefender(ctx, cardId) {
    if (!ctx) return [];
    const card = this.getCard(ctx, cardId);

    return card ? card.traits.some((t) => t.id === TraitIds.DEFENDER) : false;
  }

  static getDefendedSlotsForCard(ctx, cardId) {
    const card = this.getCard(ctx, cardId);
    if (!card) return [];

    const defender = card.traits.find((t) => t.id === TraitIds.DEFENDER);

    if (!defender) {
      return [];
    }

    return ReferenceResolver.resolve(ctx, cardId, defender.slots);
  }

  static getDefendedSlots(ctx, playerId) {
    return this.getCardsForPlayer(ctx, playerId)
      .map((c) => this.getDefendedSlotsForCard(ctx, c.id))
      .reduce((acc, arr) => [...acc, ...arr])
      .filter((s, idx, self) => self.indexOf(s) === idx);
  }

  static isCardDefended(ctx, cardId) {
    if (this.isCardDefender(ctx, cardId)) {
      return false;
    }

    const card = this.getCard(ctx, cardId);
    const player = this.getPlayerForCard(ctx, cardId);
    const defended = this.getDefendedSlots(ctx, player.id);

    return defended.includes(card.slotIndex);
  }

  static getPlayerForCard(ctx, cardId) {
    if (!ctx) return;
    const card = this.getCard(ctx, cardId);

    return card && this.getPlayer(ctx, card.playerId);
  }

  static getHandActionsForCard(ctx, cardId) {
    if (!ctx) return [];
    const card = this.getCard(ctx, cardId);

    return card && card.handActions;
  }

  static getHandActionForCard(ctx, cardId, actionIdx) {
    const actions = this.getHandActionsForCard(ctx, cardId);

    return actions[actionIdx];
  }

  static getPlayActionsForCard(ctx, cardId) {
    if (!ctx) return [];
    const card = this.getCard(ctx, cardId);

    return card && card.playActions;
  }

  static getPlayActionForCard(ctx, cardId, actionIdx) {
    const actions = this.getPlayActionsForCard(ctx, cardId);

    return actions[actionIdx];
  }

  static getTraitsForCard(ctx, cardId) {
    const card = this.getCard(ctx, cardId);
    if (!card) return [];

    return card.traits;
  }

  static getTraitForCard(ctx, cardId, traitId) {
    const traits = this.getTraitsForCard(ctx, cardId);

    return traits.find((t) => t.id === traitId);
  }

  static getCardAtSlot(ctx, playerId, slotIndex) {
    const cards = this.getPlayedCardsForPlayer(ctx, playerId);

    return cards.find((c) => c.slotIndex === slotIndex);
  }

  static cardHasTrait(ctx, cardId, traitId) {
    return Boolean(this.getTraitForCard(ctx, cardId, traitId));
  }

  static getCardsForPlayer(ctx, playerId) {
    if (!ctx) return [];
    return ctx.cards.filter((c) => c.playerId === playerId);
  }

  static getDeckForPlayer(ctx, playerId) {
    if (!ctx) return [];
    return ctx.cards.filter((c) => {
      return c.playerId === playerId && c.location === CardLocations.DECK;
    });
  }

  static getDiscardsForPlayer(ctx, playerId) {
    if (!ctx) return [];
    return ctx.cards.filter((c) => {
      return c.playerId === playerId && c.location === CardLocations.DISCARD;
    });
  }

  static getHandForPlayer(ctx, playerId) {
    if (!ctx) return [];
    return ctx.cards.filter((c) => {
      return c.playerId === playerId && c.location === CardLocations.HAND;
    });
  }

  static getHealthForPlayer(ctx, playerId) {
    const player = ctx.getPlayer(playerId);

    return player.health;
  }

  static getMoneyForPlayer(ctx, playerId) {
    const player = ctx.getPlayer(playerId);

    return player.money;
  }

  static getPlayedCardsForPlayer(ctx, playerId) {
    if (!ctx) return [];
    const cards = this.getCardsForPlayer(ctx, playerId);

    return cards.filter((c) => c.location === CardLocations.ARENA);
  }

  static getWinnerPlayer(ctx) {
    const players = this.getPlayers(ctx);

    return players.find((p) => p.isWinner);
  }

  static getAlivePlayers(ctx) {
    const players = this.getPlayers(ctx);

    return players.filter((p) => p.health > 0);
  }
}
