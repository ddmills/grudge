import * as UserService from 'services/UserService';

export default class UserController {
  static async get(userId, callback) {
    try {
      const user = await UserService.get(userId);

      callback(null, user);
    } catch (error) {
      callback(error.message);
    }
  }
}
