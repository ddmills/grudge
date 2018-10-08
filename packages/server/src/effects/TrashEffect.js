import { EffectIds } from '@grudge/data';
import CardRepository from 'repositories/CardRepository';
import Effect from './Effect';
import LobbyRepository from '../repositories/LobbyRepository';
import UserRepository from '../repositories/UserRepository';
import NotificationService from '../services/NotificationService';

export default class TrashEffect extends Effect {
  static id = EffectIds.TRASH;

  static async apply(effectParams, card) {
    const trashedCard = card.clone({
      isTrashed: true,
    });

    await CardRepository.save(trashedCard);

    const user = await UserRepository.get(card.userId);
    const lobby = await LobbyRepository.get(user.lobbyId);

    NotificationService.onCardTrashed(lobby, trashedCard);
  }
}
