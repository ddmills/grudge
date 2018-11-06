import { Context, Player, Card } from '../index';
import Serializer from './Serializer';

const cardFilterForUser = (player) => (card) => {
  return card.isOwnedBy(player.id) || card.isPlayed;
};

export default class ContextSerializer extends Serializer {
  static serialize(context, userId) {
    const {
      players,
      cards,
      ...state
    } = context;

    const player = context.getPlayerForUser(userId);
    const filteredCards = userId ? cards.filter(cardFilterForUser(player)) : cards;

    return {
      ...state,
      players: Player.serializeAll(players),
      cards: Card.serializeAll(filteredCards),
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
