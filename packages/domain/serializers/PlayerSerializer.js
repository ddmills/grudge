import { Player } from '../index';
import Serializer from './Serializer';

export default class PlayerSerializer extends Serializer {
  static serialize(player) {
    return {
      id: player.id,
      userId: player.userId,
      createdAt: player.createdAt,
      displayName: player.displayName,
      turnOrder: player.turnOrder,
      money: player.money,
      health: player.health,
    };
  }

  static deserialize(data) {
    const player = new Player();

    player.id = data.id;
    player.userId = data.userId;
    player.createdAt = data.createdAt;
    player.displayName = data.displayName;
    player.turnOrder = data.turnOrder;
    player.money = data.money;
    player.health = data.health;

    return player;
  }
}
