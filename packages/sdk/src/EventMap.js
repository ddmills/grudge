import * as Events from '@grudge/api-events';
import { Card, User, Lobby } from '@grudge/domain';
import EventHook from './EventHook';
import ResponseTransformer from './ResponseTransformer';

export default class EventMap {
  static create() {
    return [
      new EventHook(Events.CONNECTED, 'onConnected'),
      new EventHook(Events.DISCONNECTED, 'onDisconnected'),
      new EventHook(Events.FLASH, 'onFlash'),
      new EventHook(Events.LOBBY_STARTED, 'onLobbyStarted', ResponseTransformer.toModel(Lobby)),
      new EventHook(Events.LOBBY_COUNTDOWN_STOPPED, 'onLobbyCountdownStopped', ResponseTransformer.toModel(Lobby)),
      new EventHook(Events.LOBBY_COUNTDOWN_STARTED, 'onLobbyCountdownStarted', ResponseTransformer.toModel(Lobby)),
      new EventHook(Events.LOBBY_LEFT, 'onLeftLobby', ResponseTransformer.toModel(Lobby)),
      new EventHook(Events.LOBBY_JOINED, 'onJoinedLobby', ResponseTransformer.toModel(Lobby)),
      new EventHook(Events.LOBBY_USER_JOINED, 'onUserJoinedLobby', ResponseTransformer.toModel(User)),
      new EventHook(Events.LOBBY_USER_LEFT, 'onUserLeftLobby', ResponseTransformer.toModel(User)),
      new EventHook(Events.LOBBY_TURN_ENDED, 'onTurnEnded', ResponseTransformer.toModel(Lobby)),
      new EventHook(Events.CARD_DRAWN, 'onCardDrawn', ResponseTransformer.toModel(Card)),
      new EventHook(Events.CARD_DISCARDED, 'onCardDiscarded', ResponseTransformer.toModel(Card)),
      new EventHook(Events.CARD_PLAYED, 'onCardPlayed', ResponseTransformer.toModel(Card)),
    ];
  }
}
