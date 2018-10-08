import { PreconditionIds } from '@grudge/data';
import Precondition from './Precondition';

export default class TargetCardIsEnemyPrecondition extends Precondition {
  static id = PreconditionIds.TARGET_CARD_IS_ENEMY;

  static async validate(preconditionParams, { targetCard, user }) {
    if (!targetCard || user.id === targetCard.userId) {
      throw new Error('Must have an enemy target card');
    }
  }
}
