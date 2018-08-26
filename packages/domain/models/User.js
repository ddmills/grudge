import Model from './Model';

export default class User extends Model {
  static get defaults() {
    return {
      id: null,
      name: '',
      displayName: '',
      avatar: '',
    };
  }
}
