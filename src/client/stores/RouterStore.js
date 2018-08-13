import { action, computed, observable } from 'mobx';
import autobind from 'autobind-decorator';
import createRouter from 'utilities/mobx/RouterFactory';
import routes from 'screens/routes';

@autobind
export default class RouterStore {
  routes = routes;

  router = createRouter(routes, this);

  @observable
  currentName = null;

  @observable
  previousName = null;

  @observable
  params = {};

  @observable
  previousParams = {};

  @computed
  get current() {
    return this.routes[this.currentName];
  }

  @computed
  get previous() {
    return this.routes[this.previousName];
  }

  @action
  activateRoute(name, params) {
    this.previousName = this.currentName;
    this.previousParams = this.params;
    this.currentName = name;
    this.params = params;
  }

  @action
  navigate(name, params = {}) {
    this.router.navigate(name, params);
  }

  buildPath(name, params = {}) {
    return this.router.buildPath(name, params);
  }
}
