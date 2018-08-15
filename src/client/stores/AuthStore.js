import { action, computed, observable } from 'mobx';
import autobind from 'autobind-decorator';

@autobind
export default class AuthStore {
  @observable
  isAuthenticated = false;
}
