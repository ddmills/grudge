import { ReferenceResolver, ContextAdministrator } from '@grudge/domain/interpreters';
import NotificationService from 'services/NotificationService';
import { EffectIds } from '@grudge/data';
import Effect from './Effect';

export default class CollectEffect extends Effect {
  static id = EffectIds.COLLECT;

  static execute(context, { value }, { cardId, playerId }) {
    const amount = ReferenceResolver.resolve(context, cardId, value);

    if (Number.isInteger(amount)) {
      ContextAdministrator.addMoneyToPlayer(context, playerId, amount);
      NotificationService.onMoneyUpdated(context, playerId, amount);
    }
  }
}
