import ModelRepository from 'repositories/ModelRepository';
import { User } from '@grudge/domain';

export default class UserRepository extends ModelRepository {
  static modelClass = User;

  static tableName = 'users';

  static idPrefix = 'usr';
}
