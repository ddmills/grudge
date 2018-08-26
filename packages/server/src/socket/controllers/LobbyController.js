import * as LobbyService from 'services/LobbyService';

export default class LobbyController {
  static async get(lobbyId) {
    return LobbyService.get(lobbyId);
  }

  static async create(lobbyData) {
    return LobbyService.create(lobbyData);
  }

  static async list() {
    return LobbyService.list();
  }
}
