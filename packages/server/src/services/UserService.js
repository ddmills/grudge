import * as UserRepository from 'repositories/UserRepository';

export function get(userId) {
  return UserRepository.get(userId);
}
