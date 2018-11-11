import { ContextAdministrator } from '@grudge/domain/interpreters';
import NotificationService from 'services/NotificationService';
import { EffectIds } from '@grudge/data';
import Effect from './Effect';

export default class EnableEffect extends Effect {
  static id = EffectIds.ENABLE;

  static execute(context, effectParams, { cardId }) {
    ContextAdministrator.enableCard(context, cardId);
    NotificationService.onCardEnabled(context, cardId);
  }
}
