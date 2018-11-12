import { PreconditionIds } from '@grudge/data';
import { ContextInterrogator } from '@grudge/domain/interpreters';
import Precondition from './Precondition';

export default class CardIsEnabledPrecondition extends Precondition {
  static id = PreconditionIds.CARD_IS_ENABLED;

  static validate(ctx, preconditionParams, { cardId }) {
    if (ContextInterrogator.isCardDisabled(ctx, cardId)) {
      throw new Error(`Card ${cardId} is disabled`);
    }
  }
}
