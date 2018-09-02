import UserRepository from 'repositories/UserRepository';
import LobbyRepository from 'repositories/LobbyRepository';

export default class UserService {
  static async getLobbyForUser(userId) {
    const user = await UserRepository.get(userId);

    if (user.lobbyId) {
      return LobbyRepository.get(user.lobbyId);
    }
  }

  static async get(userId) {
    return UserRepository.get(userId);
  }
}
