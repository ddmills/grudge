import { EffectIds } from '@grudge/data';
import UserRepository from 'repositories/UserRepository';
import CardRepository from 'repositories/CardRepository';
import LobbyRepository from 'repositories/LobbyRepository';
import NotificationService from 'services/NotificationService';
import Effect from './Effect';

export default class TrashEffect extends Effect {
  static id = EffectIds.TRASH;

  static async apply(effectParams, { card }) {
    const trashedCard = card.clone({
      isTrashed: true,
    });

    await CardRepository.save(trashedCard);

    const user = await UserRepository.get(card.userId); // TODO: get user from actionData
    const lobby = await LobbyRepository.get(user.lobbyId);

    NotificationService.onCardTrashed(lobby, trashedCard);
  }
}
