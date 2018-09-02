const userIdByLobby = {};

export default class UserLobbyRepository {
  static async findForLobby(lobbyId) {
    return Promise.resolve(userIdByLobby[lobbyId] || []);
  }

  static async associate(userId, lobbyId) {
    userIdByLobby[lobbyId] = [...await this.findForLobby(lobbyId), userId];

    Promise.resolve();
  }

  static async disassociate(userId, lobbyId) {
    const users = await this.findForLobby(lobbyId);

    userIdByLobby[lobbyId] = users.filter((user) => user !== userId);

    return Promise.resolve();
  }
}
