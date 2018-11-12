import { ContextInterrogator } from '@grudge/domain/interpreters';
import { PreconditionIds } from '@grudge/data';
import Precondition from './Precondition';

export default class TargetCardIsNotDefendedPrecondition extends Precondition {
  static id = PreconditionIds.TARGET_CARD_IS_NOT_DEFENDED;

  static validate(ctx, preconditionParams, { targetCardId }) {
    if (ContextInterrogator.isCardDefended(ctx, targetCardId)) {
      throw new Error('Target card is defended');
    }
  }
}
