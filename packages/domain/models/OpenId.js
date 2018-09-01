import Model from './Model';

export default class OpenId extends Model {
  static get defaults() {
    return {
      id: undefined,
      userId: undefined,
      identityUrl: '',
      provider: '',
      providerId: undefined,
      createdAt: undefined,
    };
  }
}
