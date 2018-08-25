import * as UserRepository from 'domain/repositories/UserRepository';

export async function getUser(userId) {
  return UserRepository.get(userId);
}
