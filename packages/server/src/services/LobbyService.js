import LobbyRepository from 'repositories/LobbyRepository';
import UserRepository from 'repositories/UserRepository';
import NotificationService from 'services/NotificationService';
import timestamp from 'utilities/Timestamp';

export default class LobbyService {
  static async get(lobbyId) {
    return LobbyRepository.get(lobbyId);
  }

  static async create(user) {
    if (user.lobbyId) {
      throw new Error('User is already in a lobby');
    }

    const lobby = await LobbyRepository.create({
      ownerId: user.id,
    });

    return this.join(user, lobby.id);
  }

  static async startCountdown(user) {
    const lobby = await LobbyRepository.get(user.lobbyId);

    if (lobby.countdownStartedAt) {
      throw new Error('Lobby countdown has already started');
    }

    if (lobby.ownerId !== user.id) {
      throw new Error('User does not have permission to start the lobby');
    }

    await LobbyRepository.save(lobby.clone({
      countdownStartedAt: timestamp(),
    }));

    const updatedLobby = await LobbyRepository.get(lobby.id);

    NotificationService.onLobbyCountdownStarted(updatedLobby);
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

    await UserRepository.addUserToLobby(user, lobbyId);

    const lobby = await LobbyRepository.get(lobbyId);

    NotificationService.onUserJoinedLobby(lobby, user);

    return lobby;
  }

  static async leave(user) {
    const { lobbyId } = user;

    if (!lobbyId) {
      return;
    }

    await UserRepository.removeUserFromLobby(user);

    const lobby = await LobbyRepository.get(lobbyId);

    NotificationService.onUserLeftLobby(lobby, user);

    return lobby;
  }

  static async getUsersInLobby(lobbyId) {
    return UserRepository.where({ lobbyId });
  }
}
