import * as LobbyRepository from 'repositories/LobbyRepository';
import Logger from 'utilities/Logger';

export async function get(lobbyId) {
  return LobbyRepository.get(lobbyId);
}

export async function create(user, lobbyData) {
  return LobbyRepository.create({
    ...lobbyData,
    createdTimestamp: Date.now(),
    ownerId: user.id,
    playerIds: [user.id],
  });
}

export async function list() {
  return LobbyRepository.list();
}

export async function join(user, lobbyId) {
  const existingLobby = await LobbyRepository.getForUserId(user.id);

  if (existingLobby) {
    if (existingLobby.id === lobbyId) {
      return Promise.resolve(existingLobby);
    }

    return Promise.reject(new Error('User is already in a lobby'));
  }

  return Promise.reject(new Error('Lobby does not exist'));
}
