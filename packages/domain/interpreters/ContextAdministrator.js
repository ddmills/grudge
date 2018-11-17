import { CardLocations } from '@grudge/data';
import clone from 'lodash.clonedeep';
import ContextInterrogator from './ContextInterrogator';

export default class ContextAdministrator {
  static addPlayer(ctx, player) {
    if (!ctx) return;

    ctx.players.push(player);
  }

  static removePlayer(ctx, playerId) {
    if (!ctx) return;

    ctx.players = ctx.players.filter((p) => p.id !== playerId);
  }

  static removeTraitFromCard(ctx, cardId, traitId) {
    const card = ContextInterrogator.getCard(ctx, cardId);

    card.traits = card.traits.filter((t) => t.id === traitId);
  }

  static addTraitToCard(ctx, cardId, trait) {
    const card = ContextInterrogator.getCard(ctx, cardId);

    if (ContextInterrogator.cardHasTrait(ctx, cardId, trait.id)) {
      this.removeTraitFromCard(ctx, cardId, trait.id);
    }

    card.traits.push(trait);
  }

  static disableCard(ctx, cardId) {
    const card = ContextInterrogator.getCard(ctx, cardId);

    card.isDisabled = true;
  }

  static enableCard(ctx, cardId) {
    const card = ContextInterrogator.getCard(ctx, cardId);

    card.isDisabled = false;
  }

  static discardCard(ctx, cardId) {
    const card = ContextInterrogator.getCard(ctx, cardId);

    card.location = CardLocations.DISCARD;
  }

  static recycleCard(ctx, cardId) {
    const card = ContextInterrogator.getCard(ctx, cardId);

    card.location = CardLocations.DECK;
  }

  static drawCard(ctx, cardId) {
    const card = ContextInterrogator.getCard(ctx, cardId);

    card.isDisabled = false;
    card.location = CardLocations.HAND;
  }

  static drawCards(ctx, cardIds) {
    cardIds.forEach((cardId) => this.drawCard(ctx, cardId));
  }

  static discardHand(ctx, playerId) {
    const hand = ContextInterrogator.getHandForPlayer(ctx, playerId);

    hand.forEach((c) => this.discardCard(ctx, c.id));
  }

  static enableArena(ctx, playerId) {
    const arena = ContextInterrogator.getPlayedCardsForPlayer(ctx, playerId);

    arena.forEach((c) => this.enableCard(ctx, c.id));
  }

  static playCard(ctx, cardId, slotIndex) {
    const card = ContextInterrogator.getCard(ctx, cardId);

    card.slotIndex = slotIndex;
    card.location = CardLocations.ARENA;
  }

  static trashCard(ctx, cardId) {
    const card = ContextInterrogator.getCard(ctx, cardId);

    card.slotIndex = null;
    card.location = CardLocations.TRASH;
  }

  static recycleDiscardPile(ctx, playerId) {
    const discardPile = ContextInterrogator.getDiscardsForPlayer(ctx, playerId);

    discardPile.forEach((c) => this.recycleCard(ctx, c.id));
  }

  static setMoneyForPlayer(ctx, playerId, value) {
    const player = ContextInterrogator.getPlayer(ctx, playerId);

    player.money = value;
  }

  static addMoneyToPlayer(ctx, playerId, amount) {
    const player = ContextInterrogator.getPlayer(ctx, playerId);

    player.money += amount;
  }

  static subtractMoneyFromPlayer(ctx, playerId, amount) {
    const player = ContextInterrogator.getPlayer(ctx, playerId);
    const newMoney = player.money - amount;

    player.money = newMoney > 0 ? newMoney : 0;
  }

  static setHealthForPlayer(ctx, playerId, value) {
    const player = ContextInterrogator.getPlayer(ctx, playerId);

    player.health = value;
  }

  static subtractHealthFromPlayer(ctx, playerId, amount) {
    const player = ContextInterrogator.getPlayer(ctx, playerId);
    const newHealth = player.health - amount;

    player.health = newHealth > 0 ? newHealth : 0;
  }

  static resetCard(ctx, cardId) {
    const cardType = ContextInterrogator.getCardTypeForCard(ctx, cardId);
    const card = ContextInterrogator.getCard(ctx, cardId);

    card.location = CardLocations.DECK;
    card.slotIndex = null;
    card.isDisabled = false;
    card.playActions = clone(cardType.playActions);
    card.handActions = clone(cardType.handActions);
    card.traits = clone(cardType.traits);
  }

  static endTurn(ctx, nextTurn, startedAt) {
    ctx.currentTurn = nextTurn;
    ctx.turnStartedAt = startedAt;
  }

  static end(ctx, winningPlayerId, endedAtTimestamp) {
    const player = ContextInterrogator.getPlayer(ctx, winningPlayerId);

    player.isWinner = true;
    ctx.endedAt = endedAtTimestamp;
  }

  static startCountdown(ctx, startedAt) {
    ctx.countdownStartedAt = startedAt;
  }

  static stopCountdown(ctx) {
    ctx.countdownStartedAt = null;
  }
}
