import LobbyService from 'services/LobbyService';

export default class LobbyController {
  static async get({ lobbyId }) {
    return LobbyService.get(lobbyId);
  }

  static async create({ user, lobbyData }, socket) {
    return LobbyService.create(user, lobbyData, socket);
  }

  static async list() {
    return LobbyService.list();
  }

  static async join({ user, lobbyId }, socket) {
    return LobbyService.join(user, lobbyId, socket);
  }

  static async leave({ user }, socket) {
    return LobbyService.leave(user, socket);
  }

  static async getUsersInLobby({ lobbyId }) {
    return LobbyService.getUsersInLobby(lobbyId);
  }
}
