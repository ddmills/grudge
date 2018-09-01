import ModelRepository from 'repositories/ModelRepository';
import { Lobby } from '@grudge/domain';

export default class LobbyRepository extends ModelRepository {
  static modelClass = Lobby;

  static tableName = 'lobbies';

  static idPrefix = 'lby';

  static async getForUserId(userId) {
    Promise.resolve();
  }
}
