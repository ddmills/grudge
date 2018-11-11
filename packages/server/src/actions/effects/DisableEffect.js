import { ContextAdministrator } from '@grudge/domain/interpreters';
import NotificationService from 'services/NotificationService';
import { EffectIds } from '@grudge/data';
import Effect from './Effect';

export default class DisableEffect extends Effect {
  static id = EffectIds.DISABLE;

  static execute(context, effectParams, { cardId }) {
    ContextAdministrator.disableCard(context, cardId);
    NotificationService.onCardDisabled(context, cardId);
  }
}
