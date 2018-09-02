import AuthStore from 'stores/AuthStore';
import ConnectionStore from 'stores/ConnectionStore';
import RouterStore from 'stores/RouterStore';
import UserStore from 'stores/UserStore';
import LobbyStore from 'stores/LobbyStore';

export default () => {
  const authStore = new AuthStore();
  const connectionStore = new ConnectionStore(authStore);
  const routerStore = new RouterStore(authStore);
  const userStore = new UserStore(authStore);
  const lobbyStore = new LobbyStore(authStore);

  return {
    authStore,
    connectionStore,
    routerStore,
    userStore,
    lobbyStore,
  };
};
