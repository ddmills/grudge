import LobbyRepository from 'repositories/LobbyRepository';
import UserRepository from 'repositories/UserRepository';
import Logger from '../utilities/Logger';

export default class LobbyService {
  static async get(lobbyId) {
    return LobbyRepository.get(lobbyId);
  }

  static async create(user, lobbyData) {
    if (user.lobbyId) {
      throw new Error('User is currently in a lobby');
    }

    const lobby = await LobbyRepository.create({
      ...lobbyData,
      ownerId: user.id,
    });

    Logger.info('LobbyService.create');
    Logger.json(lobby.properties);

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

    await UserRepository.save(user.clone({ lobbyId }));

    Logger.info('LobbyService.join', lobbyId);
    Logger.json(user);

    return LobbyRepository.get(lobbyId);
  }

  static async getUsersInLobby(lobbyId) {
    return UserRepository.where({ lobbyId });
  }
}
