import { PreconditionIds } from '@grudge/data';
import { ContextInterpreter } from '@grudge/domain/interpreters';
import Precondition from './Precondition';

export default class TargetCardIsEnemyPrecondition extends Precondition {
  static id = PreconditionIds.TARGET_CARD_IS_ENEMY;

  static async validate(context, preconditionParams, { targetCardId, playerId }) {
    if (ContextInterpreter.isCardOwnedBy(context, targetCardId, playerId)) {
      throw new Error('Target card must be owned by an enemy');
    }

    if (!ContextInterpreter.isCardPlayed(context, targetCardId)) {
      throw new Error('Target enemy target card must be in play');
    }
  }
}
