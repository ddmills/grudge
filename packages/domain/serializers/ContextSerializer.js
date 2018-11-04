import { Context, Player, Card } from '../index';
import Serializer from './Serializer';

const cardFilterForPlayer = (player) => (card) => {
  return card.isOwnedBy(player.id) || card.isPlayed;
};

export default class ContextSerializer extends Serializer {
  static serialize(context, user) {
    const {
      players,
      cards,
      ...state
    } = context;

    const player = context.getPlayerForUser(user.id);
    const filteredCards = user ? cards.filter(cardFilterForPlayer(player)) : cards;

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
