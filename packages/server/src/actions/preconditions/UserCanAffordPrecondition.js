import { TraitIds, PreconditionIds } from '@grudge/data';
import { ContextInterrogator } from '@grudge/domain/interpreters';
import Precondition from './Precondition';

export default class UserCanAffordPrecondition extends Precondition {
  static id = PreconditionIds.USER_CAN_AFFORD;

  static validate(ctx, preconditionParams, { cardId }) {
    if (!ContextInterrogator.cardHasTrait(ctx, cardId, TraitIds.COST)) {
      return;
    }

    const cost = ContextInterrogator.getTraitForCard(ctx, cardId, TraitIds.COST).value;
    const player = ContextInterrogator.getPlayerForCard(ctx, cardId);

    if (player.money < cost) {
      throw new Error(`Player cannot afford cost of card ${cardId}`);
    }
  }
}
