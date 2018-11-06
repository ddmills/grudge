import CardTypeRepository from 'repositories/CardTypeRepository';
import Random from 'utilities/Random';
import { Card } from '@grudge/domain';
import { CardLocations } from '@grudge/data';

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
      location: CardLocations.DECK,
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
}
