import { action, computed, observable } from 'mobx';
import autobind from 'autobind-decorator';
import createRouter from 'utilities/mobx/RouterFactory';
import routes from 'screens/routes';

@autobind
export default class RouterStore {
  constructor(authStore) {
    this.authStore = authStore;
  }

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

  @computed
  get Component() {
    return this.current.Component;
  }

  @action
  activateRoute(name, params) {
    this.previousName = this.currentName;
    this.previousParams = this.params;
    this.currentName = name;
    this.params = params;
  }

  @action
  navigate(target, params = {}) {
    if (target in this.routes) {
      const route = this.routes[target];
      const targetUrl = this.buildUrl(target, params);

      if (route.isExternal) {
        window.location.href = targetUrl;
      } else if (route.isAuthRequired && !this.authStore.isAuthenticated) {
        this.router.navigate('sign-in', { target: targetUrl });
      } else {
        this.router.navigate(target, params);
      }
    } else {
      window.location.href = target;
    }
  }

  buildUrl(name, params = {}) {
    return this.router.buildPath(name, params);
  }
}
