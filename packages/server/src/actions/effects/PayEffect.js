import {
  ContextAdministrator,
  ContextInterrogator,
  ReferenceResolver,
} from '@grudge/domain/interpreters';
import { EffectIds } from '@grudge/data';
import NotificationService from 'services/NotificationService';
import Effect from './Effect';

export default class PayEffect extends Effect {
  static id = EffectIds.PAY;

  static execute(ctx, { value }, { cardId, playerId }) {
    const cost = ReferenceResolver.resolve(ctx, cardId, value);

    if (Number.isInteger(cost)) {
      ContextAdministrator.subtractMoneyFromPlayer(ctx, playerId, cost);

      const money = ContextInterrogator.getMoneyForPlayer(ctx, playerId);

      NotificationService.onMoneyUpdated(ctx, playerId, money);
    }
  }
}
