import { ContextAdministrator } from '@grudge/domain/interpreters';
import NotificationService from 'services/NotificationService';
import { EffectIds } from '@grudge/data';
import Effect from './Effect';

export default class DisableEffect extends Effect {
  static id = EffectIds.DISABLE;

  static execute(ctx, effectParams, { cardId }) {
    ContextAdministrator.disableCard(ctx, cardId);
    NotificationService.onCardDisabled(ctx, cardId);
  }
}
