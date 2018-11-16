import { PreconditionIds } from '@grudge/data';
import { ContextInterrogator } from '@grudge/domain/interpreters';
import Precondition from './Precondition';

export default class TargetCardHasTraitPrecondition extends Precondition {
  static id = PreconditionIds.TARGET_CARD_HAS_TRAIT;

  static validate(ctx, { traitId }, { targetCardId }) {
    if (!ContextInterrogator.cardHasTrait(ctx, targetCardId, traitId)) {
      throw new Error(`Card ${targetCardId} does not have trait ${traitId}`);
    }
  }
}
