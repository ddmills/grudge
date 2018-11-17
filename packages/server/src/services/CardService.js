import {
  ContextAdministrator,
  ContextInterrogator,
} from '@grudge/domain/interpreters';
import { HAND_CARD_COUNT } from '@grudge/data';
import NotificationService from 'services/NotificationService';
import CardTypeRepository from 'repositories/CardTypeRepository';
import LobbyRepository from 'repositories/LobbyRepository';
import CardRepository from 'repositories/CardRepository';
import UserRepository from 'repositories/UserRepository';
import Random from 'utilities/Random';
import ContextRepository from 'repositories/ContextRepository';

export default class CardService {
  static async enableArena(ctx, playerId) {
    ContextAdministrator.enableArena(ctx, playerId);

    await ContextRepository.save(ctx);

    NotificationService.onArenaEnabled(ctx, playerId);
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

  static async drawHand(ctx, playerId, count = HAND_CARD_COUNT) {
    ContextAdministrator.discardHand(ctx, playerId);
    const deckCardIds = ContextInterrogator.getDeckForPlayer(ctx, playerId).map((c) => c.id);
    let isDiscardRecycled = false;

    if (deckCardIds.length >= count) {
      const cardIdsToDraw = Random.sample(deckCardIds, count);

      ContextAdministrator.drawCards(ctx, cardIdsToDraw);
    } else {
      isDiscardRecycled = true;

      ContextAdministrator.drawCards(ctx, deckCardIds);
      ContextAdministrator.recycleDiscardPile(ctx, playerId);

      const freshCards = ContextInterrogator.getDeckForPlayer(ctx, playerId);

      const cardIdsToDraw = Random.sample(freshCards, count - deckCardIds.length).map((c) => c.id);

      ContextAdministrator.drawCards(ctx, cardIdsToDraw);
    }

    await ContextRepository.save(ctx);

    NotificationService.onHandDrawn(ctx, playerId, isDiscardRecycled);
  }

  static async drawHands(ctx) {
    for (const player of ctx.players) { // eslint-disable-line no-restricted-syntax
      await this.drawHand(ctx, player.id); // eslint-disable-line no-await-in-loop
    }
  }
}
