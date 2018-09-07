import ModelRepository from 'repositories/ModelRepository';
import UserLobbyRepository from 'repositories/UserLobbyRepository';
import { User } from '@grudge/domain';

export default class UserRepository extends ModelRepository {
  static modelClass = User;

  static tableName = 'users';

  static idPrefix = 'usr';

  static async addUserToLobby(user, lobbyId) {
    await UserLobbyRepository.associate(user.id, lobbyId);

    return this.save(user.clone({ lobbyId }));
  }

  static async removeUserFromLobby(user) {
    await UserLobbyRepository.disassociate(user.id, user.lobbyId);

    return this.save(user.clone({
      lobbyId: null,
      turnOrder: null,
    }));
  }
}
