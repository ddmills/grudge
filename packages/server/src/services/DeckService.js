import DeckRepository from 'repositories/DeckRepository';
import CardRepository from 'repositories/CardRepository';
import UserLobbyRepository from 'repositories/UserLobbyRepository';
import Random from 'utilities/Random';

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

  static async draw(userId, lobbyId, count = 1) {
    const deck = await DeckRepository.getForUserInLobby(userId, lobbyId);
    const allCards = await CardRepository.findForDeck(deck.id);
    const freshPile = allCards.filter((card) => !card.isDrawn && !allCards.isDiscarded);

    if (freshPile.length >= count) {
      await Promise.all(Random.sample(freshPile, count).map((card) => {
        const drawnCard = card.clone({ isDrawn: true });

        return CardRepository.save(drawnCard);
      }));
    } else {
      await Promise.all(freshPile.map((card) => {
        const drawnCard = card.clone({ isDrawn: true });

        return CardRepository.save(drawnCard);
      }));
      const recycledFreshPile = await this.recycleDiscardPile(deck.id);
      await Promise.all(Random.sample(recycledFreshPile, count - freshPile.length).map((card) => {
        const drawnCard = card.clone({ isDrawn: true });

        return CardRepository.save(drawnCard);
      }));
    }
  }

  static async drawHands(lobbyId) {
    const userIds = await UserLobbyRepository.findForLobby(lobbyId);

    await Promise.all(userIds.map((userId) => this.draw(userId, lobbyId, 5)));
  }
}
