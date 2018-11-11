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

  static addMoneyToPlayer(ctx, playerId, amount) {
    const player = ContextInterrogator.getPlayer(ctx, playerId);

    player.money += amount;
  }

  static subtractMoneyFromPlayer(ctx, playerId, amount) {
    const player = ContextInterrogator.getPlayer(ctx, playerId);
    const newMoney = player.money - amount;

    player.money = newMoney > 0 ? newMoney : 0;
  }

  static killCard(ctx, cardId) {
    const cardType = ContextInterrogator.getCardTypeForCard(ctx, cardId);
    const card = ContextInterrogator.getCard(ctx, cardId);


  }
}
