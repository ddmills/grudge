import { TraitIds, PreconditionIds } from '@grudge/data';
import Precondition from './Precondition';

export default class CardHasValuePrecondition extends Precondition {
  static id = PreconditionIds.CARD_HAS_VALUE;

  static async validate(preconditionParams, card) {
    if (!card.hasTrait(TraitIds.VALUE)) {
      throw new Error(`Card ${card.id} does not have value`);
    }
  }
}
