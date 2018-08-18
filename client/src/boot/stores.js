import AuthStore from 'stores/AuthStore';
import SocketStore from 'stores/SocketStore';
import RouterStore from 'stores/RouterStore';

const authStore = new AuthStore();
const socketStore = new SocketStore(authStore);
const routerStore = new RouterStore(authStore);

export default {
  authStore,
  socketStore,
  routerStore,
};
