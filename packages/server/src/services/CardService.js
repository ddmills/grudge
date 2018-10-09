import CardRepository from 'repositories/CardRepository';
import NotificationService from 'services/NotificationService';
import TriggerService from 'services/TriggerService';

export default class CardService {
  static async discardCard(user, card) {
    const discardedCard = card.clone({
      isDrawn: false,
      isDiscarded: true,
      isTrashed: false,
      slotIndex: null,
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
    await TriggerService.onDrawn(user, drawnCard);

    const updatedCard = await CardRepository.get(drawnCard.id);

    NotificationService.onCardDrawn(user, updatedCard);

    return updatedCard;
  }

  static async recycleCard(card) {
    const freshCard = card.clone({
      isDrawn: false,
      isDiscarded: false,
      isTrashed: false,
      slotIndex: null,
    });

    await CardRepository.save(freshCard);

    return freshCard;
  }

  static async getPlayedCardsForUser(userId) {
    const cards = await CardRepository.where({
      userId,
      isDiscarded: false,
      isTrashed: false,
    });

    return cards.filter((card) => card.isPlayed);
  }
}
