import CardRepository from 'repositories/CardRepository';
import LobbyRepository from 'repositories/LobbyRepository';
import NotificationService from 'services/NotificationService';

export default class CardService {
  static async playCard(user, cardId) {
    const card = await CardRepository.get(cardId);
    const lobby = await LobbyRepository.get(user.lobbyId);

    const playedCard = card.clone({
      isPlayed: true,
    });

    await CardRepository.save(playedCard);

    NotificationService.onCardPlayed(lobby, card);

    return playedCard;
  }
}
