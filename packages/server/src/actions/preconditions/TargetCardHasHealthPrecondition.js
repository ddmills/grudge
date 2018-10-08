import { TraitIds, PreconditionIds } from '@grudge/data';
import Precondition from './Precondition';

export default class TargetCardHasHealthPrecondition extends Precondition {
  static id = PreconditionIds.TARGET_CARD_HAS_HEALTH;

  static async validate(preconditionParams, { targetCard }) {
    if (!targetCard || !targetCard.hasTrait(TraitIds.HEALTH)) {
      throw new Error('Target card does not have health');
    }
  }
}
