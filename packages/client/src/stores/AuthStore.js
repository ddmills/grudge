import {
  autorun, action, computed, observable,
} from 'mobx';
import autobind from 'autobind-decorator';
import MobXCookie from 'utilities/mobx/MobXCookie';
import jwt from 'jsonwebtoken';
import sdk from '@grudge/sdk';

@autobind
export default class AuthStore {
  @observable
  cookie = new MobXCookie('JWT');

  @computed
  get token() {
    return this.cookie.get();
  }

  @computed
  get userId() {
    if (this.token) {
      return jwt.decode(this.token).userId;
    }

    return undefined;
  }

  constructor() {
    autorun(() => {
      if (this.token) {
        sdk.configure(this.token);
      } else {
        sdk.disconnect();
      }
    });
  }

  @action
  deauthenticate() {
    this.cookie.remove();
  }

  @computed
  get isAuthenticated() {
    return Boolean(this.token);
  }
}
