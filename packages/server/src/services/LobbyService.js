import LobbyRepository from 'repositories/LobbyRepository';
import UserRepository from 'repositories/UserRepository';
import UserLobbyRepository from 'repositories/UserLobbyRepository';
import NotificationService from 'services/NotificationService';

export default class LobbyService {
  static async get(lobbyId) {
    return LobbyRepository.get(lobbyId);
  }

  static async create(user, lobbyData) {
    if (user.lobbyId) {
      throw new Error('User is already in a lobby');
    }

    const lobby = await LobbyRepository.create({
      ...lobbyData,
      ownerId: user.id,
    });

    return this.join(user, lobby.id);
  }

  static async list() {
    return LobbyRepository.list();
  }

  static async join(user, lobbyId) {
    if (user.lobbyId) {
      if (user.lobbyId === lobbyId) {
        return LobbyRepository.get(lobbyId);
      }

      throw new Error('User is already in a lobby');
    }

    const lobby = await LobbyRepository.get(lobbyId);
    await UserRepository.save(user.clone({ lobbyId }));

    await UserLobbyRepository.associateWithLobby(lobby.id, user.id);

    NotificationService.onUserJoinedLobby(lobby, user);

    return lobby;
  }

  static async leave(user) {
    const { lobbyId } = user;

    if (!lobbyId) {
      return;
    }

    await UserRepository.save(user.clone({ lobbyId: null }));

    const lobby = await LobbyRepository.get(lobbyId);

    await UserLobbyRepository.disassociateWithLobby(lobby.id, user.id);
    NotificationService.onUserLeftLobby(lobby, user);
  }

  static async getUsersInLobby(lobbyId) {
    return UserRepository.where({ lobbyId });
  }
}
