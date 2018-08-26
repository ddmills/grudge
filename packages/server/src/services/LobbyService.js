import * as LobbyRepository from 'repositories/LobbyRepository';

export function get(lobbyId) {
  return LobbyRepository.get(lobbyId);
}

export function create(lobbyData) {
  return LobbyRepository.create({
    createdTimestamp: Date.now(),
    ...lobbyData,
  });
}

export function list() {
  return LobbyRepository.list();
}
