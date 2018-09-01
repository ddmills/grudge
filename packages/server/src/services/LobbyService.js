import LobbyRepository from 'repositories/LobbyRepository';
import UserRepository from 'repositories/UserRepository';

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
  if (user.lobbyId) {
    if (user.lobbyId === lobbyId) {
      return LobbyRepository.get(lobbyId);
    }

    throw new Error('User is already in a lobby');
  }

  await UserRepository.save(user.clone({ lobbyId }));

  return LobbyRepository.get(lobbyId);
}

export async function getUsersInLobby(lobbyId) {
  return UserRepository.where({ lobbyId });
}
