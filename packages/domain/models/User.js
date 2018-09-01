import Model from './Model';

export default class User extends Model {
  static get defaults() {
    return {
      id: undefined,
      name: '',
      displayName: '',
      avatar: '',
      createdAt: undefined,
    };
  }
}
