import * as Events from '@grudge/api-events';
import {
  Card, User, Lobby, Player, Context,
} from '@grudge/domain';
import EventHook from './EventHook';
import ResponseTransformer from './ResponseTransformer';

export default class EventMap {
  static create() {
    return [
      new EventHook(Events.CONNECTED, 'onConnected'),
      new EventHook(Events.DISCONNECTED, 'onDisconnected'),
      new EventHook(Events.FLASH, 'onFlash'),
      new EventHook(Events.LOBBY_STARTED, 'onLobbyStarted', ResponseTransformer.toModel(Lobby)),
      new EventHook(Events.LOBBY_ENDED, 'onLobbyEnded', ResponseTransformer.toModel(Lobby)),
      new EventHook(Events.LOBBY_COUNTDOWN_STOPPED, 'onLobbyCountdownStopped', ResponseTransformer.toModel(Lobby)),
      new EventHook(Events.LOBBY_COUNTDOWN_STARTED, 'onLobbyCountdownStarted', ResponseTransformer.toModel(Lobby)),
      new EventHook(Events.LOBBY_LEFT, 'onLeftLobby', ResponseTransformer.toModel(Lobby)),
      new EventHook(Events.LOBBY_JOINED, 'onJoinedLobby', ResponseTransformer.toModel(Lobby)),
      new EventHook(Events.LOBBY_USER_JOINED, 'onUserJoinedLobby', ResponseTransformer.toModel(User)),
      new EventHook(Events.LOBBY_USER_LEFT, 'onUserLeftLobby', ResponseTransformer.toModel(User)),
      new EventHook(Events.LOBBY_TURN_ENDED, 'onTurnEnded', ResponseTransformer.toModel(Lobby)),
      new EventHook(Events.CARD_DRAWN, 'onCardDrawn', ResponseTransformer.toModel(Card)),
      new EventHook(Events.CARD_DISCARDED, 'onCardDiscarded', ResponseTransformer.toModel(Card)),
      new EventHook(Events.CARD_TRASHED, 'onCardTrashed', ResponseTransformer.toModel(Card)),
      new EventHook(Events.CARD_KILLED, 'onCardKilled', ResponseTransformer.toModel(Card)),
      new EventHook(Events.CARD_PLAYED, 'onCardPlayed', ResponseTransformer.toModel(Card)),
      new EventHook(Events.CARD_TRAIT_ADDED, 'onCardTraitAdded', ResponseTransformer.toModel(Card)),
      new EventHook(Events.CARD_TRAIT_REMOVED, 'onCardTraitRemoved', ResponseTransformer.toModel(Card)),
      new EventHook(Events.USER_MONEY_UPDATED, 'onUserMoneyUpdated', ResponseTransformer.toModel(User)),
      new EventHook(Events.USER_HEALTH_UPDATED, 'onUserHealthUpdated', ResponseTransformer.toModel(User)),
      new EventHook(Events.CONTEXT_PLAYER_JOINED, 'onPlayerJoined', ResponseTransformer.toModel(Player)),
      new EventHook(Events.CONTEXT_PLAYER_LEFT, 'onPlayerLeft', ResponseTransformer.toModel(Player)),
      new EventHook(Events.CONTEXT_JOINED, 'onJoinedContext', ResponseTransformer.toModel(Context)),
      new EventHook(Events.CONTEXT_LEFT, 'onLeftContext', ResponseTransformer.toModel(Context)),
      new EventHook(Events.CONTEXT_COUNTDOWN_STOPPED, 'onCountdownStopped', ResponseTransformer.toModel(Context)),
      new EventHook(Events.CONTEXT_COUNTDOWN_STARTED, 'onCountdownStarted', ResponseTransformer.toModel(Context)),
    ];
  }
}
