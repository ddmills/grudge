import UserService from 'services/UserService';

export default class UserController {
  static async get({ userId }) {
    return UserService.get(userId);
  }

  static async getLobbyForUser({ userId }) {
    return UserService.getLobbyForUser(userId);
  }
}
