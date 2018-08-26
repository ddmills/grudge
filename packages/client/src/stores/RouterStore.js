import {
  action, autorun, computed, observable,
} from 'mobx';
import autobind from 'autobind-decorator';
import createRouter from 'utilities/mobx/RouterFactory';

@autobind
export default class RouterStore {
  @observable
  isStarted = false;

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
    return this.routesByName[this.currentName];
  }

  @computed
  get previous() {
    return this.routesByName[this.previousName];
  }

  @computed
  get Component() {
    return this.current ? this.current.Component : 'div';
  }

  constructor(authStore) {
    this.authStore = authStore;
  }

  start(routes) {
    this.routes = routes;
    this.router = createRouter(this.routes.map((route) => route.toJSON()), this);
    this.routesByName = this.routes.reduce((byName, route) => ({
      ...byName,
      [route.name]: route,
    }), {});

    this.navigate();

    autorun(() => {
      if (!this.authStore.isAuthenticated && this.current.isAuthRequired) {
        this.navigate();
      }
    });
  }

  @action
  activateRoute(name, params) {
    this.previousName = this.currentName;
    this.previousParams = this.params;
    this.currentName = name;
    this.params = params;
  }

  @action
  navigate(target = window.location.href, params = {}) {
    if (target in this.routesByName) {
      const route = this.routesByName[target];

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
