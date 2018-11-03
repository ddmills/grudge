import DeckRepository from 'repositories/DeckRepository';
import CardRepository from 'repositories/CardRepository';
import CardTypeRepository from 'repositories/CardTypeRepository';
import UserLobbyRepository from 'repositories/UserLobbyRepository';
import UserRepository from 'repositories/UserRepository';
import UserService from 'services/UserService';
import CardService from 'services/CardService';
import Random from 'utilities/Random';
import { Card } from '@grudge/domain';

const HAND_CARD_COUNT = 5;
const STARTING_CARD_TYPES = [
  'cdt-praying-mantis',
  'cdt-otter',
  'cdt-toad',
  'cdt-stoat',
  'cdt-stoat',
  'cdt-stoat',
  'cdt-goose',
  'cdt-goose',
  'cdt-goose',
  'cdt-goose',
];

export default class DeckService {
  static async createCardForPlayer(player, cardTypeId) {
    const cardType = await CardTypeRepository.get(cardTypeId);

    return Card.create({
      id: Random.id('crd'),
      cardTypeId: cardType.id,
      playerId: player.id,
      traits: cardType.traits,
      playActions: cardType.playActions,
      handActions: cardType.handActions,
    });
  }

  static async populateStarterCardsForPlayer(context, player) {
    const cardPromises = STARTING_CARD_TYPES.map(async (cardTypeId) => {
      return this.createCardForPlayer(player, cardTypeId);
    });
    const cards = await Promise.all(cardPromises);

    context.cards.push(...cards);
  }

  static async populateStarterCards(context) {
    const playerPromises = context.players.map((player) => {
      return this.populateStarterCardsForPlayer(context, player);
    });

    await Promise.all(playerPromises);

    return context;
  }

  static async createStarterDeck(lobbyId, userId) {
    const deck = await DeckRepository.create({
      lobbyId,
      userId,
    });

    return Promise.all(STARTING_CARD_TYPES.map(async (cardTypeId) => {
      const cardType = await CardTypeRepository.get(cardTypeId);

      return CardRepository.createForCardType(cardType, {
        lobbyId,
        userId,
        deckId: deck.id,
      });
    }));
  }

  static async createStarterDecks(lobbyId) {
    const userIds = await UserLobbyRepository.findForLobby(lobbyId);

    return Promise.all(userIds.map((userId) => this.createStarterDeck(lobbyId, userId)));
  }

  static async recycleDiscardPile(user) {
    const allCards = await CardRepository.findForUser(user.id, user.lobbyId);
    const discardPile = allCards.filter((card) => card.isDiscarded && !card.isTrashed);

    return Promise.all(discardPile.map((card) => {
      return CardService.recycleCard(card);
    }));
  }

  static async getHand(user) {
    const lobby = await UserService.getLobbyForUser(user.id);

    if (lobby && lobby.isRunning) {
      const cards = await CardRepository.findForUser(user.id, user.lobbyId);

      return cards.filter((card) => card.isInHand);
    }

    return [];
  }

  static async discardHand(user) {
    const cards = await CardRepository.findForUser(user.id, user.lobbyId);
    const hand = cards.filter((card) => card.isInHand);

    return Promise.all(hand.map((card) => CardService.discardCard(user, card)));
  }

  static async refreshHand(user) {
    await this.discardHand(user);

    return this.draw(user, HAND_CARD_COUNT);
  }

  static async drawHands(context) {
    await Promise.all(context.players.map((player) => this.draw(context, player, HAND_CARD_COUNT)));
  }
}
