const userIdByLobby = {};

export default class UserLobbyRepository {
  static async findForLobby(lobbyId) {
    return Promise.resolve(userIdByLobby[lobbyId] || []);
  }

  static async associateWithLobby(lobbyId, userId) {
    userIdByLobby[lobbyId] = [...await this.findForLobby(lobbyId), userId];

    Promise.resolve();
  }

  static async disassociateWithLobby(lobbyId, userId) {
    const users = await this.findForLobby(lobbyId);

    userIdByLobby[lobbyId] = users.filter((user) => user !== userId);

    return Promise.resolve();
  }
}
