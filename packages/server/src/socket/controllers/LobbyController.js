import * as LobbyService from 'services/LobbyService';
import Logger from 'utilities/Logger';

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

  static async list(callback) {
    try {
      const lobbies = await LobbyService.list();

      callback(null, lobbies);
    } catch (error) {
      Logger.error(error);
      callback(error.message);
    }
  }
}
