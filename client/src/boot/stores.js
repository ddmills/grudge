import AuthStore from 'stores/AuthStore';
import ConnectionStore from 'stores/ConnectionStore';
import RouterStore from 'stores/RouterStore';
import UserStore from 'stores/UserStore';

export default () => {
  const authStore = new AuthStore();
  const userStore = new UserStore(authStore);
  const connectionStore = new ConnectionStore(authStore);
  const routerStore = new RouterStore(authStore);

  return {
    authStore,
    connectionStore,
    routerStore,
    userStore,
  };
};
