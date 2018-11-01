import { Context, Player } from '../index';
import Serializer from './Serializer';

export default class ContextSerializer extends Serializer {
  static serialize(context) {
    const {
      id,
      createdAt,
      players,
      ...state
    } = context;

    return {
      id,
      createdAt,
      state: {
        ...state,
        players: Player.serializeAll(players),
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
