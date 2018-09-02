import RedisClient from 'providers/redis/RedisClient';

const key = (lobbyId) => `lby-usr:${lobbyId}`;

export default class UserLobbyRepository {
  static async findForLobby(lobbyId) {
    return new Promise((resolve, reject) => {
      RedisClient.singleton.smembers(key(lobbyId), (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data || []);
        }
      });
    });
  }

  static async associate(userId, lobbyId) {
    RedisClient.singleton.sadd(key(lobbyId), userId);

    return Promise.resolve();
  }

  static async disassociate(userId, lobbyId) {
    RedisClient.singleton.srem(key(lobbyId), userId);

    return Promise.resolve();
  }
}
