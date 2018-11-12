import { ContextAdministrator } from '@grudge/domain/interpreters';
import { EffectIds } from '@grudge/data';
import NotificationService from 'services/NotificationService';
import Effect from './Effect';

export default class PlayEffect extends Effect {
  static id = EffectIds.PLAY;

  static async execute(ctx, effectParams, { cardId, targetSlotIndex }) {
    ContextAdministrator.playCard(ctx, cardId, targetSlotIndex);

    NotificationService.onCardPlayed(ctx, cardId, targetSlotIndex);
  }
}
