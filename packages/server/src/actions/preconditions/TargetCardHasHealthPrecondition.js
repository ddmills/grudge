import { TraitIds } from '@grudge/data';
import Precondition from './Precondition';

export default class TargetCardHasHealthPrecondition extends Precondition {
  static id = 'pcd-target-card-has-health';

  static async validate(card, actionData) {
    if (!actionData.targetCard || !actionData.targetCard.hasTrait(TraitIds.HEALTH)) {
      throw new Error(`${actionData.id} requires a target with health`);
    }
  }
}
