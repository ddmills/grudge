import { User } from '@grudge/domain';

let currentId = 0;
const users = {};

export async function save(user) {
  let userWithId;

  if (user.id) {
    userWithId = user;
  } else {
    userWithId = user.clone({
      id: ++currentId,
    });
  }

  users[currentId] = userWithId.properties;

  return Promise.resolve(userWithId);
}

export async function create(properties) {
  return save(User.create(properties));
}

export async function get(userId) {
  if (!(userId in users)) {
    const error = new Error(`Could not find user with id ${userId}`);

    return Promise.reject(error);
  }

  const user = User.create(users[userId]);

  return Promise.resolve(user);
}
