import * as Events from '@grudge/api-events';
import { User } from '@grudge/domain';
import EventHook from './EventHook';
import ResponseTransformer from './ResponseTransformer';

export default class EventMap {
  static create() {
    return [
      new EventHook(Events.CONNECTED, 'onConnected'),
      new EventHook(Events.DISCONNECTED, 'onDisconnected'),
      new EventHook(Events.ERROR, 'onError'),
      new EventHook(Events.LOBBY_USER_JOINED, 'onUserJoinedLobby', ResponseTransformer.toModel(User)),
      new EventHook(Events.LOBBY_USER_LEFT, 'onUserLeftLobby', ResponseTransformer.toModel(User)),
      new EventHook(Events.FLASH, 'onFlash'),
    ];
  }
}
