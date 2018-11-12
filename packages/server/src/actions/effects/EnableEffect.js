import { ContextAdministrator } from '@grudge/domain/interpreters';
import NotificationService from 'services/NotificationService';
import { EffectIds } from '@grudge/data';
import Effect from './Effect';

export default class EnableEffect extends Effect {
  static id = EffectIds.ENABLE;

  static execute(ctx, effectParams, { cardId }) {
    ContextAdministrator.enableCard(ctx, cardId);
    NotificationService.onCardEnabled(ctx, cardId);
  }
}
