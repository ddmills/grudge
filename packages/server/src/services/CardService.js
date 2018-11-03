import NotificationService from 'services/NotificationService';
import CardTypeRepository from 'repositories/CardTypeRepository';
import LobbyRepository from 'repositories/LobbyRepository';
import CardRepository from 'repositories/CardRepository';
import UserRepository from 'repositories/UserRepository';
import TraitService from 'services/TraitService';
import Random from 'utilities/Random';
import { TraitIds } from '@grudge/data';
import ContextRepository from 'repositories/ContextRepository';
import Logger from 'utilities/Logger';

const HAND_CARD_COUNT = 5;

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

  static async killCard(card) {
    const cardType = await CardTypeRepository.get(card.cardTypeId);

    await CardRepository.resetForCardType(card, cardType, {
      slotIndex: null,
      isTrashed: false,
      isDiscarded: true,
      isDrawn: false,
    });

    const lobby = await LobbyRepository.get(card.lobbyId);

    NotificationService.onCardKilled(lobby, card);
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

  static async draw(context, player, count = 1) {
    const allCards = context.getCardsForPlayer(player.id);
    const freshPile = allCards.filter((card) => card.isFresh);

    if (freshPile.length >= count) {
      const cardsToDraw = Random.sample(freshPile, count);

      cardsToDraw.map((card) => card.draw());
    } else {
      freshPile.map((card) => card.draw());

      const discardPile = allCards.filter((card) => card.isDiscarded && !card.isTrashed);

      discardPile.map((card) => card.recycle());

      const cardsToDraw = Random.sample(discardPile, count - freshPile.length);

      cardsToDraw.map((card) => card.draw());
    }

    await ContextRepository.save(context);

    const drawnCards = context.getCardsForPlayer(player.id).filter((card) => card.isDrawn);

    drawnCards.forEach((card) => NotificationService.onCardDrawn(context, card));
  }

  static async drawHand(context, player) {
    return this.draw(context, player, HAND_CARD_COUNT);
  }

  static async drawHands(context) {
    await Promise.all(context.players.map((player) => this.drawHand(context, player)));
  }
}
