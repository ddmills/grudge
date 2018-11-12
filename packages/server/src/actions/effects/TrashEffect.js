import { ContextAdministrator } from '@grudge/domain/interpreters';
import { EffectIds } from '@grudge/data';
import NotificationService from 'services/NotificationService';
import Effect from './Effect';

export default class TrashEffect extends Effect {
  static id = EffectIds.TRASH;

  static async apply(ctx, effectParams, { cardId }) {
    ContextAdministrator.trashCard(ctx, cardId);

    NotificationService.onCardTrashed(ctx, cardId);
  }
}
