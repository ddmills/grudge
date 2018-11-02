import { Context, Player, Card } from '../index';
import Serializer from './Serializer';

export default class ContextSerializer extends Serializer {
  static serialize(context) {
    const {
      id,
      createdAt,
      players,
      cards,
      ...state
    } = context;

    return {
      id,
      createdAt,
      state: {
        ...state,
        players: Player.serializeAll(players),
        cards: Card.serializeAll(cards),
      },
    };
  }

  static deserialize(data) {
    return Context.create({
      id: data.id,
      createdAt: data.createdAt,
      ...data.state,
      players: Player.deserializeAll(data.state.players),
    });
  }
}
