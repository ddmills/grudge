import { TraitIds, PreconditionIds } from '@grudge/data';
import { ContextInterpreter } from '@grudge/domain/interpreters';
import Precondition from './Precondition';

export default class CardIsEnabledPrecondition extends Precondition {
  static id = PreconditionIds.CARD_IS_ENABLED;

  static async validate(context, preconditionParams, { cardId }) {
    if (ContextInterpreter.cardHasTrait(context, cardId, TraitIds.DISABLED)) {
      throw new Error(`Card ${cardId} is disabled`);
    }
  }
}
