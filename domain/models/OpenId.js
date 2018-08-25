import Model from './Model';

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
