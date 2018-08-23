import { CONNECTED, DISCONNECTED, ERROR } from './Events';
import SocketFactory from './SocketFactory';
import EventHook from './EventHook';

export default class SDK {
  constructor() {
    this.handlers = [
      new EventHook(CONNECTED, 'onConnected'),
      new EventHook(DISCONNECTED, 'onDisconnected'),
      new EventHook(ERROR, 'onError'),
    ];

    this.handlers.forEach((handler) => handler.attach(this));
  }

  configure(token) {
    this.socket = SocketFactory.create(token);
    this.listen(this.socket);
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  listen(socket) {
    this.handlers.forEach((handler) => handler.listen(socket));
  }
}
