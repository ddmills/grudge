import AuthStore from 'stores/AuthStore';
import ConnectionStore from 'stores/ConnectionStore';
import RouterStore from 'stores/RouterStore';
import UserStore from 'stores/UserStore';
import LobbyStore from 'stores/LobbyStore';
import TurnStore from 'stores/TurnStore';
import CardTypeStore from 'stores/CardTypeStore';
import CardStore from 'stores/CardStore';
import ActionStore from 'stores/ActionStore';

export default () => {
  const authStore = new AuthStore();
  const connectionStore = new ConnectionStore(authStore);
  const routerStore = new RouterStore(authStore);
  const lobbyStore = new LobbyStore(authStore);
  const userStore = new UserStore(authStore, lobbyStore);
  const turnStore = new TurnStore(lobbyStore, userStore);
  const cardTypeStore = new CardTypeStore();
  const cardStore = new CardStore(userStore);
  const actionStore = new ActionStore(cardStore, turnStore);

  return {
    authStore,
    connectionStore,
    routerStore,
    userStore,
    lobbyStore,
    turnStore,
    cardTypeStore,
    cardStore,
    actionStore,
  };
};
