import LobbyRepository from 'repositories/LobbyRepository';
import UserRepository from 'repositories/UserRepository';
import MessengerService from 'services/MessengerService';

export default class LobbyService {
  static async get(lobbyId) {
    return LobbyRepository.get(lobbyId);
  }

  static async create(user, lobbyData, socket) {
    if (user.lobbyId) {
      throw new Error('User is currently in a lobby');
    }

    const lobby = await LobbyRepository.create({
      ...lobbyData,
      ownerId: user.id,
    });

    return this.join(user, lobby.id, socket);
  }

  static async list() {
    return LobbyRepository.list();
  }

  static async join(user, lobbyId, socket) {
    if (user.lobbyId) {
      if (user.lobbyId === lobbyId) {
        return LobbyRepository.get(lobbyId);
      }

      throw new Error('User is already in a lobby');
    }

    await UserRepository.save(user.clone({ lobbyId }));

    socket.join(lobbyId);
    MessengerService.onUserJoinedLobby(lobbyId, user);

    return LobbyRepository.get(lobbyId);
  }

  static async getUsersInLobby(lobbyId) {
    return UserRepository.where({ lobbyId });
  }
}
