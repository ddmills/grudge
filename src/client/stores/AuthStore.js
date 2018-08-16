import { action, computed, observable } from 'mobx';
import autobind from 'autobind-decorator';
import MobXCookie from 'utilities/mobx/MobXCookie';

@autobind
export default class AuthStore {
  @observable
  cookie = new MobXCookie('JWT');

  @computed
  get token() {
    return this.cookie.get();
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
