import { TraitIds } from '@grudge/data';
import Precondition from './Precondition';

export default class CardHasValuePrecondition extends Precondition {
  static id = 'pcd-card-has-value';

  static async validate(card) {
    if (!card.hasTrait(TraitIds.VALUE)) {
      throw new Error(`Card ${card.id} does not have value`);
    }
  }
}
