import { PreconditionIds } from '@grudge/data';
import { ContextInterpreter } from '@grudge/domain/interpreters';
import Precondition from './Precondition';

export default class CardHasTraitPrecondition extends Precondition {
  static id = PreconditionIds.CARD_HAS_TRAIT;

  static async validate(context, { traitId }, { cardId }) {
    if (!ContextInterpreter.cardHasTrait(context, cardId, traitId)) {
      throw new Error(`Card ${cardId} does not have trait ${traitId}`);
    }
  }
}
