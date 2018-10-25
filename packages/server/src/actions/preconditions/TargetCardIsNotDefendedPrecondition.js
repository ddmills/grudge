import CardService from 'services/CardService';
import ActionRefService from 'services/ActionRefService';
import { TraitIds, PreconditionIds } from '@grudge/data';
import Precondition from './Precondition';

async function getDefendedSlots(card) {
  if (!card.hasTrait(TraitIds.DEFENDER)) {
    return [];
  }

  const defender = card.getTrait(TraitIds.DEFENDER);

  return ActionRefService.resolve(card, defender.slots);
}

export default class TargetCardIsNotDefendedPrecondition extends Precondition {
  static id = PreconditionIds.TARGET_CARD_IS_NOT_DEFENDED;

  static async validate(preconditionParams, { targetCard }) {
    if (targetCard.hasTrait(TraitIds.DEFENDER)) {
      return;
    }

    const playedCards = await CardService.getPlayedCardsForUser(targetCard.userId);

    const nestedDefendedSlots = await Promise.all(playedCards.map(getDefendedSlots));
    const defendedSlots = nestedDefendedSlots.reduce((acc, arr) => [...acc, ...arr]);

    if (defendedSlots.includes(targetCard.slotIndex)) {
      throw new Error('Target card is defended');
    }
  }
}
