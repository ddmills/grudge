import { computed, observable } from 'mobx';
import autobind from 'autobind-decorator';
import * as Cookie from 'utilities/dom/Cookie';

@autobind
export default class AuthStore {
  @observable
  token = Cookie.read('JWT');

  @computed
  get isAuthenticated() {
    return Boolean(this.token);
  }
}
