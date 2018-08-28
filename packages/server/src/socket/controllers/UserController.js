import * as UserService from 'services/UserService';

export default class UserController {
  static async get({ userId }) {
    return UserService.get(userId);
  }
}
