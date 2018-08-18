import { action, computed, observable } from 'mobx';
import autobind from 'autobind-decorator';
import createRouter from 'utilities/mobx/RouterFactory';
import routes from 'screens/routes';

@autobind
export default class RouterStore {
  constructor(authStore) {
    this.authStore = authStore;
    this.navigate(window.location.href);
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

      if (route.isAuthRequired && !this.authStore.isAuthenticated) {
        const targetUrl = this.buildUrl(target, params);

        return this.router.navigate('sign-in', { target: targetUrl });
      }

      return this.router.navigate(target, params);
    }

    const match = this.router.matchUrl(target);

    if (match) {
      return this.navigate(match.name, match.params);
    }

    return this.router.navigate(target, params);
  }

  buildUrl(name, params = {}) {
    return this.router.buildPath(name, params) || name;
  }
}
