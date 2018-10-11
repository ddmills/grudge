import CardRepository from 'repositories/CardRepository';
import NotificationService from 'services/NotificationService';
import UserRepository from 'repositories/UserRepository';
import TraitService from 'services/TraitService';
import { TraitIds } from '@grudge/data';
import Logger from 'utilities/Logger';

export default class CardService {
  static async enableCard(cardId) {
    return TraitService.removeTrait(cardId, TraitIds.DISABLED);
  }

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
    const updatedCard = await this.enableCard(drawnCard.id);

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
    const user = await UserRepository.get(userId);

    const cards = await CardRepository.where({
      userId: user.id,
      lobbyId: user.lobbyId,
      isDiscarded: false,
      isTrashed: false,
    });

    return cards.filter((card) => card.isPlayed);
  }

  static async enablePlayed(user) {
    const playedCards = await this.getPlayedCardsForUser(user.id);

    return Promise.all(playedCards.map((card) => this.enableCard(card.id)));
  }
}
