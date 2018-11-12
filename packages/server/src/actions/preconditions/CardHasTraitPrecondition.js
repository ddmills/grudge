import { PreconditionIds } from '@grudge/data';
import { ContextInterrogator } from '@grudge/domain/interpreters';
import Precondition from './Precondition';

export default class CardHasTraitPrecondition extends Precondition {
  static id = PreconditionIds.CARD_HAS_TRAIT;

  static validate(ctx, { traitId }, { cardId }) {
    if (!ContextInterrogator.cardHasTrait(ctx, cardId, traitId)) {
      throw new Error(`Card ${cardId} does not have trait ${traitId}`);
    }
  }
}
