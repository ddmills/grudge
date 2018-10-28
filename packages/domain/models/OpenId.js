import BasicModel from './BasicModel';

export default class OpenId extends BasicModel {
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
