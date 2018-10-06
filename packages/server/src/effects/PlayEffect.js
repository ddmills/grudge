import { EffectIds } from '@grudge/data';
import CardRepository from 'repositories/CardRepository';
import Effect from './Effect';
import LobbyRepository from '../repositories/LobbyRepository';
import UserRepository from '../repositories/UserRepository';
import NotificationService from '../services/NotificationService';

export default class PlayEffect extends Effect {
  static id = EffectIds.PLAY;

  static async apply(effect, card) {
    const playedCard = card.clone({
      isPlayed: true,
    });

    await CardRepository.save(playedCard);

    const user = await UserRepository.get(card.userId);
    const lobby = await LobbyRepository.get(user.lobbyId);

    NotificationService.onCardPlayed(lobby, playedCard);
  }
}
