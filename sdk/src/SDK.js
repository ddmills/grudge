import { CONNECTED, DISCONNECTED } from './Events';
import SocketFactory from './SocketFactory';

export default class SDK {
  constructor() {
    this.listeners = {
      CONNECTED: this.onConnected,
      DISCONNECTED: this.onDisconnected,
    };
  }

  configure(token) {
    this.token = token;
    this.socket = SocketFactory.create(this.token);
    this.setupHandlers();
  }

  onConnected() {
    console.log('SDK onConnected');
  }

  onDisconnected() {
    console.log('SDK onDisconnected');
  }

  setupHandlers() {
    Object.values(this.listeners).forEach((event) => {
      this.socket.on(event, this.listeners[event]);
    });
  }
}
