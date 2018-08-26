import EventHook from './EventHook';
import { CONNECTED, DISCONNECTED, ERROR } from './Events';

export default class EventMap {
  static create() {
    return [
      new EventHook(CONNECTED, 'onConnected'),
      new EventHook(DISCONNECTED, 'onDisconnected'),
      new EventHook(ERROR, 'onError'),
    ];
  }
}
