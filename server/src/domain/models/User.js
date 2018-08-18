import Model from 'domain/models/Model';

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
