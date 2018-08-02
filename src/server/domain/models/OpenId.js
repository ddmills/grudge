import Model from 'domain/models/Model';

export default class OpenId extends Model {
  static get defaults() {
    return {
      id: null,
      userId: null,
      identityUrl: '',
      provider: '',
    };
  }
}
