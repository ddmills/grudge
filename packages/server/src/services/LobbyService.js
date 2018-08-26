import * as LobbyRepository from 'repositories/LobbyRepository';

export function get(lobbyId) {
  return LobbyRepository.get(lobbyId);
}

export function create(lobbyData) {
  return LobbyRepository.create(lobbyData);
}
