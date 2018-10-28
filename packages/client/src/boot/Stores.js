import WindowSizeStore from 'stores/WindowSizeStore';
import AuthStore from 'stores/AuthStore';
import ConnectionStore from 'stores/ConnectionStore';
import RouterStore from 'stores/RouterStore';
import UserStore from 'stores/UserStore';
import LobbyStore from 'stores/LobbyStore';
import ContextStore from 'stores/ContextStore';
import TurnStore from 'stores/TurnStore';
import CardTypeStore from 'stores/CardTypeStore';
import CardStore from 'stores/CardStore';
import ActionStore from 'stores/ActionStore';
import ActionRefStore from 'stores/ActionRefStore';
import TraitStore from 'stores/TraitStore';

export default () => {
  const windowSizeStore = new WindowSizeStore();
  const authStore = new AuthStore();
  const connectionStore = new ConnectionStore(authStore);
  const routerStore = new RouterStore(authStore);
  const lobbyStore = new LobbyStore(authStore, routerStore);
  const contextStore = new ContextStore(authStore, routerStore);
  const userStore = new UserStore(authStore, lobbyStore);
  const turnStore = new TurnStore(lobbyStore, userStore);
  const cardTypeStore = new CardTypeStore();
  const cardStore = new CardStore(userStore);
  const actionRefStore = new ActionRefStore(cardStore);
  const traitStore = new TraitStore(cardStore, actionRefStore);
  const actionStore = new ActionStore(cardStore, turnStore, userStore, traitStore);

  return {
    windowSizeStore,
    authStore,
    connectionStore,
    routerStore,
    userStore,
    lobbyStore,
    contextStore,
    turnStore,
    cardTypeStore,
    cardStore,
    actionStore,
    actionRefStore,
    traitStore,
  };
};
