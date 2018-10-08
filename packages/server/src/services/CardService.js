import CardRepository from 'repositories/CardRepository';
import NotificationService from 'services/NotificationService';
import TriggerService from 'services/TriggerService';

export default class CardService {
  static async discardCard(user, card) {
    const discardedCard = card.clone({
      isDrawn: false,
      isDiscarded: true,
      isPlayed: false,
      isTrashed: false,
    });

    await CardRepository.save(discardedCard);

    NotificationService.onCardDiscarded(user, discardedCard);

    return discardedCard;
  }

  static async drawCard(user, card) {
    const drawnCard = card.clone({
      isDrawn: true,
      isDiscarded: false,
      isTrashed: false,
    });

    await CardRepository.save(drawnCard);
    await TriggerService.onDrawn(drawnCard);

    const updatedCard = await CardRepository.get(drawnCard.id);

    NotificationService.onCardDrawn(user, updatedCard);

    return updatedCard;
  }

  static async recycleCard(card) {
    const freshCard = card.clone({
      isDrawn: false,
      isDiscarded: false,
      isPlayed: false,
      isTrashed: false,
    });

    await CardRepository.save(freshCard);

    return freshCard;
  }

  static async getPlayedCardsForUser(userId) {
    return CardRepository.where({
      userId,
      isPlayed: true,
      isDiscarded: false,
      isTrashed: false,
    });
  }
}
