import * as UserRepository from 'repositories/UserRepository';

export async function getUser(userId) {
  return UserRepository.get(userId);
}
