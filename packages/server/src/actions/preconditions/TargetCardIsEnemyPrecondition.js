import { PreconditionIds } from '@grudge/data';
import Precondition from './Precondition';

export default class TargetCardIsEnemyPrecondition extends Precondition {
  static id = PreconditionIds.TARGET_CARD_IS_ENEMY;

  static async validate(preconditionParams, card, actionData) {
    if (!actionData.targetCard || card.userId === actionData.targetCard.userId) {
      throw new Error(`${actionData.id} requires an enemy target card`);
    }
  }
}
