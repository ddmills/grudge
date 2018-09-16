import LobbyService from 'services/LobbyService';

export default class LobbyController {
  static async get({ lobbyId }) {
    return LobbyService.get(lobbyId);
  }

  static async create({ user }) {
    return LobbyService.create(user);
  }

  static async startCountdown({ user }) {
    return LobbyService.startCountdown(user);
  }

  static async stopCountdown({ user }) {
    return LobbyService.stopCountdown(user);
  }

  static async endTurn({ user }) {
    return LobbyService.endTurn(user);
  }

  static async list() {
    return LobbyService.list();
  }

  static async join({ user, lobbyId }) {
    return LobbyService.join(user, lobbyId);
  }

  static async leave({ user }) {
    return LobbyService.leave(user);
  }
}
