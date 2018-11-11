import { TraitIds, PreconditionIds } from '@grudge/data';
import { ContextInterpreter } from '@grudge/domain/interpreters';
import Precondition from './Precondition';

export default class UserCanAffordPrecondition extends Precondition {
  static id = PreconditionIds.USER_CAN_AFFORD;

  static async validate(context, preconditionParams, { cardId }) {
    if (!ContextInterpreter.cardHasTrait(context, cardId, TraitIds.COST)) {
      return;
    }

    const cost = ContextInterpreter.getTraitForCard(context, cardId, TraitIds.COST).value;
    const player = ContextInterpreter.getPlayerForCard(context, cardId);

    if (player.money < cost) {
      throw new Error(`Player cannot afford cost of card ${cardId}`);
    }
  }
}
