import DeckRepository from 'repositories/DeckRepository';
import CardRepository from 'repositories/CardRepository';
import UserLobbyRepository from 'repositories/UserLobbyRepository';
import NotificationService from 'services/NotificationService';
import Random from 'utilities/Random';
import UserRepository from 'repositories/UserRepository';

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
      'theif',
      'theif',
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

    return Promise.all(discardPile.map((card) => {
      return CardRepository.save(card.clone({
        isDrawn: false,
        isDiscarded: false,
      }));
    }));
  }

  static async drawCard(userId, card) {
    const drawnCard = card.clone({ isDrawn: true });

    NotificationService.onCardDrawn(userId, drawnCard);

    return CardRepository.save(drawnCard);
  }

  static async draw(user, lobbyId, count = 1) {
    const deck = await DeckRepository.getForUserInLobby(user.id, lobbyId);
    const allCards = await CardRepository.findForDeck(deck.id);
    const freshPile = allCards.filter((card) => !card.isDrawn && !allCards.isDiscarded);

    if (freshPile.length >= count) {
      await Promise.all(Random.sample(freshPile, count).map((card) => {
        return this.drawCard(user, card);
      }));
    } else {
      await Promise.all(freshPile.map((card) => {
        return this.drawCard(user, card);
      }));
      const recycledFreshPile = await this.recycleDiscardPile(deck.id);

      await Promise.all(Random.sample(recycledFreshPile, count - freshPile.length).map((card) => {
        return this.drawCard(user, card);
      }));
    }
  }

  static async discardCard(user, card) {
    const discardedCard = card.clone({
      isDiscarded: true,
    });

    await CardRepository.save(discardedCard);

    NotificationService.onCardDiscarded(user, card);

    return this.discardedCard;
  }

  static async discardHand(user, lobbyId) {
    const deck = await DeckRepository.getForUserInLobby(user.id, lobbyId);
    const cards = await CardRepository.findForDeck(deck.id);
    const hand = cards.filter((card) => card.isDrawn);

    return hand.map((card) => this.discardCard(user, card));
  }

  static async drawHands(lobbyId) {
    const users = await UserRepository.getForLobby(lobbyId);

    await Promise.all(users.map((user) => this.draw(user, lobbyId, 5)));
  }
}
