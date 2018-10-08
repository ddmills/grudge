import { TraitIds, PreconditionIds } from '@grudge/data';
import Precondition from './Precondition';

export default class TargetCardHasHealthPrecondition extends Precondition {
  static id = PreconditionIds.TARGET_CARD_HAS_HEALTH;

  static async validate(preconditionParams, card, actionData) {
    if (!actionData.targetCard || !actionData.targetCard.hasTrait(TraitIds.HEALTH)) {
      throw new Error(`${actionData.id} requires a target with health`);
    }
  }
}
