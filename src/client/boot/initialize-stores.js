import AuthStore from 'stores/AuthStore';
import RouterStore from 'stores/RouterStore';

export default function initialize() {
  return {
    authStore: new AuthStore(),
    routerStore: new RouterStore(),
  };
}
