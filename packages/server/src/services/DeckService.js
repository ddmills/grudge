import DeckRepository from 'repositories/DeckRepository';
import CardRepository from 'repositories/CardRepository';
import UserLobbyRepository from 'repositories/UserLobbyRepository';
import UserRepository from 'repositories/UserRepository';
import NotificationService from 'services/NotificationService';
import UserService from 'services/UserService';
import Random from 'utilities/Random';

const HAND_CARD_COUNT = 5;

export default class DeckService {
  static async createStarterDeck(lobbyId, userId) {
    const deck = await DeckRepository.create({
      lobbyId,
      userId,
    });

    const startingCardTypes = [
      'tax-collector',
      'tax-collector',
      'tax-collector',
      'graveyard',
      'graveyard',
      'graveyard',
      'thief',
      'thief',
      'monk',
      'monk',
    ];

    return Promise.all(startingCardTypes.map((cardTypeId) => {
      return CardRepository.create({
        cardTypeId,
        deckId: deck.id,
      });
    }));
  }

  static async createStarterDecks(lobbyId) {
    const userIds = await UserLobbyRepository.findForLobby(lobbyId);

    return Promise.all(userIds.map((userId) => this.createStarterDeck(lobbyId, userId)));
  }

  static async recycleDiscardPile(deckId) {
    const allCards = await CardRepository.findForDeck(deckId);
    const discardPile = allCards.filter((card) => card.isDiscarded);

    return Promise.all(discardPile.map(async (card) => {
      const freshCard = card.clone({
        isDrawn: false,
        isDiscarded: false,
      });

      await CardRepository.save(freshCard);

      return freshCard;
    }));
  }

  static async drawCard(user, card) {
    const drawnCard = card.clone({
      isDrawn: true,
    });

    NotificationService.onCardDrawn(user, drawnCard);

    return CardRepository.save(drawnCard);
  }

  static async draw(user, lobbyId, count = 1) {
    const deck = await DeckRepository.getForUserInLobby(user.id, lobbyId);
    const allCards = await CardRepository.findForDeck(deck.id);
    const freshPile = allCards.filter((card) => !card.isDrawn && !allCards.isDiscarded);

    if (freshPile.length >= count) {
      const cardsToDraw = Random.sample(freshPile, count);

      await Promise.all(cardsToDraw.map((card) => this.drawCard(user, card)));
    } else {
      await Promise.all(freshPile.map((card) => this.drawCard(user, card)));

      const recycledFreshPile = await this.recycleDiscardPile(deck.id);
      const cardsToDraw = Random.sample(recycledFreshPile, count - freshPile.length);

      await Promise.all(cardsToDraw.map((card) => this.drawCard(user, card)));
    }
  }

  static async discardCard(user, card) {
    const discardedCard = card.clone({
      isDrawn: false,
      isDiscarded: true,
    });

    await CardRepository.save(discardedCard);

    NotificationService.onCardDiscarded(user, card);

    return this.discardedCard;
  }

  static async getHand(user) {
    const lobby = await UserService.getLobbyForUser(user.id);

    if (lobby && lobby.isRunning) {
      const deck = await DeckRepository.getForUserInLobby(user.id, user.lobbyId);
      const cards = await CardRepository.findForDeck(deck.id);

      return cards.filter((card) => card.isDrawn);
    }

    return [];
  }

  static async discardHand(user, lobbyId) {
    const deck = await DeckRepository.getForUserInLobby(user.id, lobbyId);
    const cards = await CardRepository.findForDeck(deck.id);
    const hand = cards.filter((card) => card.isDrawn);

    return Promise.all(hand.map((card) => this.discardCard(user, card)));
  }

  static async refreshHand(user, lobbyId) {
    await this.discardHand(user, lobbyId);

    return this.draw(user, lobbyId, HAND_CARD_COUNT);
  }

  static async drawHands(lobbyId) {
    const users = await UserRepository.getForLobby(lobbyId);

    await Promise.all(users.map((user) => this.draw(user, lobbyId, HAND_CARD_COUNT)));
  }
}
