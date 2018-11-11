import { PreconditionIds } from '@grudge/data';
import { ContextInterpreter } from '@grudge/domain/interpreters';
import Precondition from './Precondition';

export default class CardHasTraitPrecondition extends Precondition {
  static id = PreconditionIds.TARGET_CARD_HAS_TRAIT;

  static async validate(context, { traitId }, { targetCardId }) {
    if (!ContextInterpreter.cardHasTrait(context, targetCardId, traitId)) {
      throw new Error(`Card ${targetCardId} does not have trait ${traitId}`);
    }
  }
}
