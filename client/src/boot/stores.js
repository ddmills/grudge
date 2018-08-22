import AuthStore from 'stores/AuthStore';
import SocketStore from 'stores/SocketStore';
import RouterStore from 'stores/RouterStore';
import UserStore from 'stores/UserStore';

export default () => {
  const authStore = new AuthStore();
  const socketStore = new SocketStore(authStore);
  const userStore = new UserStore(socketStore);
  const routerStore = new RouterStore(authStore);

  return {
    authStore,
    socketStore,
    routerStore,
    userStore,
  };
};
