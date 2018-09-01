import LobbyRepository from 'repositories/LobbyRepository';

export async function get(lobbyId) {
  return LobbyRepository.get(lobbyId);
}

export async function create(user, lobbyData) {
  return LobbyRepository.create({
    ...lobbyData,
    ownerId: user.id,
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

  const lobby = await LobbyRepository.get(lobbyId);

  if (lobby.isFull) {
    return Promise.reject(new Error('User cannot join lobby because it is full'));
  }

  const lobbyWithPlayer = lobby.addPlayer(user.id);

  return LobbyRepository.save(lobbyWithPlayer);
}
