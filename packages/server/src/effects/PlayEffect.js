import { EffectIds } from '@grudge/data';
import CardRepository from 'repositories/CardRepository';
import Effect from './Effect';
import LobbyRepository from '../repositories/LobbyRepository';
import UserRepository from '../repositories/UserRepository';
import NotificationService from '../services/NotificationService';
import TriggerService from '../services/TriggerService';

export default class PlayEffect extends Effect {
  static id = EffectIds.PLAY;

  static async apply(effectParams, card) {
    const playedCard = card.clone({
      isPlayed: true,
    });

    await CardRepository.save(playedCard);

    const user = await UserRepository.get(card.userId);
    const lobby = await LobbyRepository.get(user.lobbyId);

    await TriggerService.onPlayed(playedCard);

    NotificationService.onCardPlayed(lobby, playedCard);
  }
}
