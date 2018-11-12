import { PreconditionIds } from '@grudge/data';
import { ContextInterrogator } from '@grudge/domain/interpreters';
import Precondition from './Precondition';

export default class TargetCardIsAllyPrecondition extends Precondition {
  static id = PreconditionIds.TARGET_CARD_IS_ALLY;

  static validate(ctx, preconditionParams, { targetCardId, playerId }) {
    if (!ContextInterrogator.isCardOwnedBy(ctx, targetCardId, playerId)) {
      throw new Error('Target card must be owned by ally');
    }

    if (!ContextInterrogator.isCardPlayed(ctx, targetCardId)) {
      throw new Error('Target ally target card must be in play');
    }
  }
}
