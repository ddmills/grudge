import { CardLocations } from '@grudge/data';
import { Context, Player, Card } from '../index';
import Serializer from './Serializer';

const hideCard = (card) => {
  return card.clone({
    location: card.location === CardLocations.ARENA ? card.location : CardLocations.UNKNOWN,
  });
};

const mapCardForPlayer = (player) => (card) => {
  if (!player) {
    return card;
  }

  if (card.playerId === player.id) {
    return card;
  }

  return hideCard(card);
};

export default class ContextSerializer extends Serializer {
  static serialize(context, userId) {
    const {
      players,
      cards,
      ...state
    } = context;

    const player = context.getPlayerForUser(userId);
    const mappedCards = cards.map(mapCardForPlayer(player));

    return {
      ...state,
      players: Player.serializeAll(players),
      cards: Card.serializeAll(mappedCards),
    };
  }

  static deserialize(data) {
    return Context.create({
      ...data,
      players: Player.deserializeAll(data.players),
      cards: Card.deserializeAll(data.cards),
    });
  }
}
