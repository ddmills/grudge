import { Context, Player, Card } from '../index';
import Serializer from './Serializer';

const cardFilterForUser = (user) => (card) => {
  return card.isOwnedBy(user.id) || card.isPlayed;
};

export default class ContextSerializer extends Serializer {
  static serialize(context, user) {
    const {
      id,
      createdAt,
      players,
      cards,
      ...state
    } = context;

    const filteredCards = user ? cards.filter(cardFilterForUser(user)) : cards;

    return {
      id,
      createdAt,
      state: {
        ...state,
        players: Player.serializeAll(players),
        cards: Card.serializeAll(filteredCards),
      },
    };
  }

  static deserialize(data) {
    return Context.create({
      id: data.id,
      createdAt: data.createdAt,
      ...data.state,
      players: Player.deserializeAll(data.state.players),
      cards: Card.deserializeAll(data.state.cards),
    });
  }
}
