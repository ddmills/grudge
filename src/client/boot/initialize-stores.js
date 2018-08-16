import AuthStore from 'stores/AuthStore';
import RouterStore from 'stores/RouterStore';

export default function initialize() {
  const authStore = new AuthStore();
  const routerStore = new RouterStore(authStore);

  return {
    authStore,
    routerStore,
  };
}
