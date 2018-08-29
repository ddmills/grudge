import * as LobbyService from 'services/LobbyService';

export default class LobbyController {
  static async get({ lobbyId }) {
    return LobbyService.get(lobbyId);
  }

  static async create({ user, lobbyData }) {
    return LobbyService.create(user, lobbyData);
  }

  static async list() {
    return LobbyService.list();
  }

  static async join({ user, lobbyId }) {
    return LobbyService.join(user, lobbyId);
  }
}
