import { User } from '@grudge/domain';
import { DB } from 'services/StorageService';
import cuid from 'cuid';

export default class UserRepository {
  static async save(user) {
    let userWithId;

    if (user.id) {
      userWithId = user;
    } else {
      userWithId = user.clone({
        id: `usr-${cuid()}`,
      });
    }

    await DB.table('users').insert(userWithId.properties);

    return UserRepository.get(userWithId.id);
  }

  static async create(properties) {
    return UserRepository.save(User.create(properties));
  }

  static async get(userId) {
    const data = await DB.table('users').where('id', userId).first();

    if (!data) {
      const error = new Error(`Could not find user with id ${userId}`);

      return Promise.reject(error);
    }

    const user = User.create(data);

    return Promise.resolve(user);
  }
}
