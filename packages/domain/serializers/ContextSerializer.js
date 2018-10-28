import { Context } from '../index';
import Serializer from './Serializer';
import PlayerSerializer from './PlayerSerializer';

export default class ContextSerializer extends Serializer {
  static serialize(context) {
    return {
      id: context.id,
      createdAt: context.createdAt,
      state: {
        players: PlayerSerializer.serializeAll(context.players),
        currentTurn: context.currentTurn,
      },
    };
  }

  static deserialize(data) {
    return Context.create({
      id: data.id,
      createdAt: data.createdAt,
      players: PlayerSerializer.deserializeAll(data.state.players),
      currentTurn: data.state.currentTurn,
    });
  }
}
