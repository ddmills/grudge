import { PreconditionIds } from '@grudge/data';
import Precondition from './Precondition';

export default class TargetCardIsAllyPrecondition extends Precondition {
  static id = PreconditionIds.TARGET_CARD_IS_ALLY;

  static async validate(preconditionParams, { targetCard, user }) {
    if (!targetCard || user.id !== targetCard.userId) {
      throw new Error('Must have an ally target card');
    }

    if (!targetCard.isPlayed) {
      throw new Error('Target ally target card must be in play');
    }
  }
}
