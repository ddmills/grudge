import { CardLocations } from '@grudge/data';
import clone from 'lodash.clonedeep';
import ContextInterrogator from './ContextInterrogator';

export default class ContextAdministrator {
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

  static playCard(ctx, cardId, slotIndex) {
    const card = ContextInterrogator.getCard(ctx, cardId);

    card.slotIndex = slotIndex;
  }

  static trashCard(ctx, cardId) {
    const card = ContextInterrogator.getCard(ctx, cardId);

    card.slotIndex = null;
    card.location = CardLocations.TRASH;
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
}
