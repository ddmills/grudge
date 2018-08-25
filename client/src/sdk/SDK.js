import {
  CONNECTING, CONNECTED, CONNECT_ERROR, CONNECT_TIMEOUT, USER_GET,
} from 'sdk/Events';
import SocketFactory from './SocketFactory';
import EventMap from './EventMap';
import EventHook from './EventHook';
import Query from './Query';

export default class SDK {
  constructor() {
    this.eventMap = EventMap.create();
    this.eventMap.forEach((handler) => handler.attach(this));

    this.onConnectingEventHook = new EventHook(CONNECTING, 'onConnecting');
    this.onConnectingEventHook.attach(this);
  }

  configure(token) {
    this.token = token;
  }

  connect() {
    if (this.socket) {
      if (this.socket.connected) {
        return Promise.resolve();
      }

      return new Promise((resolve, reject) => {
        this.socket.once(CONNECTED, () => resolve());
        this.socket.once(CONNECT_ERROR, () => reject(new Error('Socket could not connect')));
        this.socket.once(CONNECT_TIMEOUT, () => reject(new Error('Socket timed out while attempting to connect')));
      });
    }

    if (!this.token) {
      return Promise.reject(new Error('Socket has not been configured yet'));
    }

    return new Promise((resolve, reject) => {
      this.onConnectingEventHook.trigger();
      this.socket = SocketFactory.create(this.token);
      this.socket.once(CONNECTED, () => resolve());
      this.socket.once(CONNECT_ERROR, () => reject(new Error('Socket could not connect')));
      this.socket.once(CONNECT_TIMEOUT, () => reject(new Error('Socket timed out while attempting to connect')));
      this.listen(this.socket);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  query(event, ...args) {
    return this.connect().then(() => {
      return Query.send(this.socket, event, args);
    });
  }

  getUser(userId) {
    return this.query(USER_GET, userId);
  }

  listen(socket) {
    this.eventMap.forEach((handler) => handler.listen(socket));
  }
}
