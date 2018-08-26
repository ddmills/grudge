import * as LobbyService from 'services/LobbyService';

export default class LobbyController {
  static async get(lobbyId, callback) {
    try {
      const lobby = await LobbyService.get(lobbyId);

      callback(null, lobby);
    } catch (error) {
      callback(error.message);
    }
  }

  static async create(lobbyData, callback) {
    try {
      const lobby = await LobbyService.create(lobbyData);

      callback(null, lobby);
    } catch (error) {
      callback(error.message);
    }
  }
}
