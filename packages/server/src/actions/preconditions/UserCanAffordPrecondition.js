import { TraitIds, PreconditionIds } from '@grudge/data';
import { ContextInterrogator } from '@grudge/domain/interpreters';
import Precondition from './Precondition';

export default class UserCanAffordPrecondition extends Precondition {
  static id = PreconditionIds.USER_CAN_AFFORD;

  static validate(context, preconditionParams, { cardId }) {
    if (!ContextInterrogator.cardHasTrait(context, cardId, TraitIds.COST)) {
      return;
    }

    const cost = ContextInterrogator.getTraitForCard(context, cardId, TraitIds.COST).value;
    const player = ContextInterrogator.getPlayerForCard(context, cardId);

    if (player.money < cost) {
      throw new Error(`Player cannot afford cost of card ${cardId}`);
    }
  }
}
