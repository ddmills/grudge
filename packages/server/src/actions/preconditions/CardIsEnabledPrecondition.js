import { TraitIds } from '@grudge/data';
import Precondition from './Precondition';

export default class CardIsEnabledPrecondition extends Precondition {
  static id = 'pcd-card-is-enabled';

  static async validate(card) {
    if (card.hasTrait(TraitIds.DISABLED)) {
      throw new Error(`Card ${card.id} is disabled`);
    }
  }
}
