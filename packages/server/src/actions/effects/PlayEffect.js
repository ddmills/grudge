import { EffectIds } from '@grudge/data';
import CardRepository from 'repositories/CardRepository';
import LobbyRepository from 'repositories/LobbyRepository';
import NotificationService from 'services/NotificationService';
import TriggerService from 'services/TriggerService';
import Effect from './Effect';

export default class PlayEffect extends Effect {
  static id = EffectIds.PLAY;

  static async apply(effectParams, { card, user }) {
    const allCards = await CardRepository.findForUser(user.id);
    const playedCardIndexes = allCards.filter((c) => c.isPlayed).map((c) => c.slotIndex);
    const openSlotIndexes = [0, 1, 2, 3, 4, 5].filter((idx) => !playedCardIndexes.includes(idx));

    if (openSlotIndexes.length <= 0) {
      throw new Error('No open slot to play card');
    }

    const targetSlotIndex = openSlotIndexes[0];

    const playedCard = card.clone({
      isPlayed: true,
      slotIndex: targetSlotIndex,
    });

    await CardRepository.save(playedCard);

    const lobby = await LobbyRepository.get(user.lobbyId);

    await TriggerService.onPlayed(user, playedCard);

    NotificationService.onCardPlayed(lobby, playedCard);
  }
}
