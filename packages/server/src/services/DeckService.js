import DeckRepository from 'repositories/DeckRepository';
import CardRepository from 'repositories/CardRepository';
import CardTypeRepository from 'repositories/CardTypeRepository';
import UserLobbyRepository from 'repositories/UserLobbyRepository';
import UserRepository from 'repositories/UserRepository';
import UserService from 'services/UserService';
import CardService from 'services/CardService';
import Random from 'utilities/Random';

const HAND_CARD_COUNT = 5;

export default class DeckService {
  static async createStarterDeck(lobbyId, userId) {
    const deck = await DeckRepository.create({
      lobbyId,
      userId,
    });

    const startingCardTypes = [
      'cdt-soldier',
      'cdt-soldier',
      'cdt-tax-collector',
      'cdt-tax-collector',
      'cdt-watchtower',
      'cdt-watchtower',
      'cdt-cathedral',
      'cdt-cathedral',
      'cdt-thief',
      'cdt-thief',
      'cdt-monk',
      'cdt-monk',
    ];

    return Promise.all(startingCardTypes.map(async (cardTypeId) => {
      const cardType = await CardTypeRepository.get(cardTypeId);

      return CardRepository.createForCardType(cardType, {
        userId,
        deckId: deck.id,
      });
    }));
  }

  static async createStarterDecks(lobbyId) {
    const userIds = await UserLobbyRepository.findForLobby(lobbyId);

    return Promise.all(userIds.map((userId) => this.createStarterDeck(lobbyId, userId)));
  }

  static async recycleDiscardPile(userId) {
    const allCards = await CardRepository.findForUser(userId);
    const discardPile = allCards.filter((card) => card.isDiscarded && !card.isTrashed);

    return Promise.all(discardPile.map((card) => {
      return CardService.recycleCard(card);
    }));
  }

  static async draw(user, count = 1) {
    const allCards = await CardRepository.findForUser(user.id);
    const freshPile = allCards.filter((card) => card.isFresh);

    if (freshPile.length >= count) {
      const cardsToDraw = Random.sample(freshPile, count);

      await Promise.all(cardsToDraw.map((card) => CardService.drawCard(user, card)));
    } else {
      await Promise.all(freshPile.map((card) => CardService.drawCard(user, card)));

      const recycledFreshPile = await this.recycleDiscardPile(user.id);
      const cardsToDraw = Random.sample(recycledFreshPile, count - freshPile.length);

      await Promise.all(cardsToDraw.map((card) => CardService.drawCard(user, card)));
    }
  }

  static async getHand(user) {
    const lobby = await UserService.getLobbyForUser(user.id);

    if (lobby && lobby.isRunning) {
      const cards = await CardRepository.findForUser(user.id);

      return cards.filter((card) => card.isInHand);
    }

    return [];
  }

  static async discardHand(user) {
    const cards = await CardRepository.findForUser(user.id);
    const hand = cards.filter((card) => card.isInHand);

    return Promise.all(hand.map((card) => CardService.discardCard(user, card)));
  }

  static async refreshHand(user) {
    await this.discardHand(user);

    return this.draw(user, HAND_CARD_COUNT);
  }

  static async drawHands(lobbyId) {
    const users = await UserRepository.getForLobby(lobbyId);

    await Promise.all(users.map((user) => this.draw(user, HAND_CARD_COUNT)));
  }
}
