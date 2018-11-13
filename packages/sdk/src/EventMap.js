import * as Events from '@grudge/api-events';
import EventHook from './EventHook';

export default class EventMap {
  static create() {
    return [
      new EventHook(Events.CONNECTED, 'onConnected'),
      new EventHook(Events.DISCONNECTED, 'onDisconnected'),
      new EventHook(Events.FLASH, 'onFlash'),
      new EventHook(Events.LOBBY_STARTED, 'onLobbyStarted'),
      new EventHook(Events.LOBBY_COUNTDOWN_STOPPED, 'onLobbyCountdownStopped'),
      new EventHook(Events.LOBBY_COUNTDOWN_STARTED, 'onLobbyCountdownStarted'),
      new EventHook(Events.LOBBY_LEFT, 'onLeftLobby'),
      new EventHook(Events.LOBBY_JOINED, 'onJoinedLobby'),
      new EventHook(Events.LOBBY_USER_JOINED, 'onUserJoinedLobby'),
      new EventHook(Events.LOBBY_USER_LEFT, 'onUserLeftLobby'),
      new EventHook(Events.CARD_DRAWN, 'onCardDrawn'),
      new EventHook(Events.CARD_DISCARDED, 'onCardDiscarded'),
      new EventHook(Events.CARD_TRASHED, 'onCardTrashed'),
      new EventHook(Events.CARD_KILLED, 'onCardKilled'),
      new EventHook(Events.CARD_PLAYED, 'onCardPlayed'),
      new EventHook(Events.CARD_DISABLED, 'onCardDisabled'),
      new EventHook(Events.CARD_ENABLED, 'onCardEnabled'),
      new EventHook(Events.CARD_TRAIT_ADDED, 'onCardTraitAdded'),
      new EventHook(Events.CARD_TRAIT_REMOVED, 'onCardTraitRemoved'),
      new EventHook(Events.USER_MONEY_UPDATED, 'onUserMoneyUpdated'),
      new EventHook(Events.USER_HEALTH_UPDATED, 'onUserHealthUpdated'),
      new EventHook(Events.PLAYER_MONEY_UPDATED, 'onPlayerMoneyUpdated'),
      new EventHook(Events.PLAYER_HEALTH_UPDATED, 'onPlayerHealthUpdated'),
      new EventHook(Events.PLAYER_JOINED, 'onPlayerJoined'),
      new EventHook(Events.PLAYER_LEFT, 'onPlayerLeft'),
      new EventHook(Events.CONTEXT_JOINED, 'onJoinedContext'),
      new EventHook(Events.CONTEXT_LEFT, 'onLeftContext'),
      new EventHook(Events.CONTEXT_COUNTDOWN_STOPPED, 'onCountdownStopped'),
      new EventHook(Events.CONTEXT_COUNTDOWN_STARTED, 'onCountdownStarted'),
      new EventHook(Events.CONTEXT_ENDED, 'onContextEnded'),
      new EventHook(Events.CONTEXT_STARTED, 'onContextStarted'),
      new EventHook(Events.CONTEXT_TURN_ENDED, 'onTurnEnded'),
    ];
  }
}
