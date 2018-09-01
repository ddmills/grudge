import { Lobby } from '@grudge/domain';
import { DB } from 'services/StorageService';
import cuid from 'cuid';
import Logger from 'utilities/Logger';

export default class LobbyRepository {
  static async save(lobby) {
    if (lobby.id) {
      return DB.table('lobbies').where('id', lobby.id).udpate(lobby.properties).first();
    }

    const id = `lby-${cuid()}`;
    const lobbyWithId = lobby.clone({ id });
    await DB.table('lobbies').insert(lobbyWithId.properties);

    return id;
  }

  static async create(properties) {
    const id = await LobbyRepository.save(Lobby.create(properties));

    return LobbyRepository.get(id);
  }

  static async get(lobbyId) {
    const data = await DB.table('lobbies').where('id', lobbyId).first();

    if (!data) {
      const error = new Error(`Could not find lobby with id ${lobbyId}`);

      return Promise.reject(error);
    }

    const lobby = Lobby.create(data);

    return Promise.resolve(lobby);
  }

  static async list() {
    try {
      const results = await DB.table('lobbies').select();

      return results.map((result) => Lobby.create(result));
    } catch (error) {
      Logger.error(error);
      throw new Error('Database Error');
    }
  }

  static async getForUserId(userId) {
    Promise.resolve();
    // const foundLobby = Object.values(lobbies).find((lobby) => {
    //   return lobby.playerIds.includes(userId);
    // });

    // return Promise.resolve(foundLobby);
  }
}
