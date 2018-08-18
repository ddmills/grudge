import AuthStore from 'stores/AuthStore';
import RouterStore from 'stores/RouterStore';

const authStore = new AuthStore();
const routerStore = new RouterStore(authStore);

export default {
  authStore,
  routerStore,
};
