import { ContextInterpreter } from '@grudge/domain/interpreters';
import { PreconditionIds } from '@grudge/data';
import Precondition from './Precondition';

export default class TargetCardIsNotDefendedPrecondition extends Precondition {
  static id = PreconditionIds.TARGET_CARD_IS_NOT_DEFENDED;

  static async validate(context, preconditionParams, { targetCardId }) {
    if (ContextInterpreter.isCardDefended(context, targetCardId)) {
      throw new Error('Target card is defended');
    }
  }
}
