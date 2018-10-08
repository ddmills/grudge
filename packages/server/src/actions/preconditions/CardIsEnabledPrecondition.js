import { TraitIds, PreconditionIds } from '@grudge/data';
import Precondition from './Precondition';

export default class CardIsEnabledPrecondition extends Precondition {
  static id = PreconditionIds.CARD_IS_ENABLED;

  static async validate(preconditionParams, { card }) {
    if (card.hasTrait(TraitIds.DISABLED)) {
      throw new Error(`Card ${card.id} is disabled`);
    }
  }
}
