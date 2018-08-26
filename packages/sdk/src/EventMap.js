import { CONNECTED, DISCONNECTED, ERROR } from '@grudge/api-events';
import EventHook from './EventHook';

export default class EventMap {
  static create() {
    return [
      new EventHook(CONNECTED, 'onConnected'),
      new EventHook(DISCONNECTED, 'onDisconnected'),
      new EventHook(ERROR, 'onError'),
    ];
  }
}
