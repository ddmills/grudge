import SocketFactory from './SocketFactory';
import EventMap from './EventMap';

export default class SDK {
  constructor() {
    this.eventMap = EventMap.create();
    this.eventMap.forEach((handler) => handler.attach(this));
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
    this.eventMap.forEach((handler) => handler.listen(socket));
  }
}
