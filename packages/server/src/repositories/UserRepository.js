import { User } from '@grudge/domain';
import * as StorageService from 'services/StorageService';

let currentId = 0;

export async function save(user) {
  let userWithId;

  if (user.id) {
    userWithId = user;
  } else {
    userWithId = user.clone({
      id: `user-${++currentId}`,
    });
  }

  const userId = userWithId.id;

  return StorageService.put(`user:${userId}`, userWithId.properties);
}

export async function create(properties) {
  return save(User.create(properties));
}

export async function get(userId) {
  const data = await StorageService.get(`user:${userId}`);

  if (!data) {
    const error = new Error(`Could not find user with id ${userId}`);

    return Promise.reject(error);
  }

  const user = User.create(data);

  return Promise.resolve(user);
}
