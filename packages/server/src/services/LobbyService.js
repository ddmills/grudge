import LobbyRepository from 'repositories/LobbyRepository';
import UserRepository from 'repositories/UserRepository';
import NotificationService from 'services/NotificationService';
import timestamp from 'utilities/Timestamp';
import Random from 'utilities/Random';
import LobbyProcessor from './LobbyProcessor';

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

  static async start(lobbyId) {
    const lobby = await LobbyRepository.get(lobbyId);

    if (!lobby.isCountdownStarted) {
      throw new Error('Lobby countdown has been cancelled');
    }

    if (lobby.isStarted) {
      throw new Error('Lobby has already started');
    }

    const users = await this.getUsersInLobby(lobby.id);

    await Promise.all(Random.shuffle(users).map((user, idx) => {
      return UserRepository.save(user.clone({
        turnOrder: idx,
      }));
    }));

    const updatedLobby = lobby.clone({
      startedAt: timestamp(),
    });

    await LobbyRepository.save(updatedLobby);

    NotificationService.onLobbyStarted(updatedLobby);

    return updatedLobby;
  }

  static async endTurn(user) {
    const lobby = await LobbyRepository.get(user.lobbyId);
    const users = await this.getUsersInLobby(lobby.id);
    const currentTurnUser = lobby.pickCurrentTurnUser(users);

    if (user.id !== currentTurnUser.id) {
      throw new Error('Cannot end someone elses turn');
    }

    const updatedLobby = lobby.clone({
      currentTurn: lobby.currentTurn + 1,
    });

    await LobbyRepository.save(updatedLobby);

    NotificationService.onTurnEnded(updatedLobby);

    return updatedLobby;
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
    LobbyProcessor.scheduleCountdown(updatedLobby);
  }

  static async stopCountdown(user) {
    const lobby = await LobbyRepository.get(user.lobbyId);

    if (lobby.isStarted) {
      throw new Error('Lobby has already started');
    }

    if (!lobby.isCountdownStarted) {
      return lobby;
    }

    await LobbyRepository.save(lobby.clone({
      countdownStartedAt: null,
    }));

    const updatedLobby = await LobbyRepository.get(lobby.id);

    NotificationService.onLobbyCountdownStopped(updatedLobby);
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

    if (lobby.isCountingDown) {
      throw new Error('Lobby is already starting');
    }

    if (lobby.isStarted) {
      throw new Error('Lobby is already started');
    }

    await UserRepository.addUserToLobby(user, lobbyId);

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

    if (lobby.isCountingDown) {
      this.stopCountdown(user);
    }

    NotificationService.onUserLeftLobby(lobby, user);

    return lobby;
  }

  static async getUsersInLobby(lobbyId) {
    return UserRepository.where({ lobbyId });
  }
}
