import { PreconditionIds } from '@grudge/data';
import { ContextInterrogator } from '@grudge/domain/interpreters';
import Precondition from './Precondition';

export default class CardHasTraitPrecondition extends Precondition {
  static id = PreconditionIds.TARGET_CARD_HAS_TRAIT;

  static validate(context, { traitId }, { targetCardId }) {
    if (!ContextInterrogator.cardHasTrait(context, targetCardId, traitId)) {
      throw new Error(`Card ${targetCardId} does not have trait ${traitId}`);
    }
  }
}
