import { Context } from '../index';
import Serializer from './Serializer';
import PlayerSerializer from './PlayerSerializer';

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
        players: PlayerSerializer.serializeAll(players),
      },
    };
  }

  static deserialize(data) {
    return Context.create({
      id: data.id,
      createdAt: data.createdAt,
      ...data.state,
      players: PlayerSerializer.deserializeAll(data.state.players),
    });
  }
}
