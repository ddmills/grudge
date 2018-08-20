import {
  action, autorun, computed, observable,
} from 'mobx';
import io from 'socket.io-client';

export default class SocketStore {
  @observable
  isConnecting = false;

  @observable
  error = null;

  @observable
  socket = null;

  @computed
  get isConnected() {
    return Boolean(this.socket);
  }

  constructor(authStore) {
    this.authStore = authStore;

    autorun(() => {
      if (this.authStore.token) {
        this.connect(this.authStore.token);
      } else {
        this.disconnect();
      }
    });
  }

  @action
  connect(token) {
    this.isConnecting = true;
    this.socket = io({
      query: {
        token,
      },
    });

    this.socket.on('connect', this.onConnect.bind(this));
    this.socket.on('disconnect', this.onDisconnect.bind(this));
    this.socket.on('error', this.onError.bind(this));
  }

  @action
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  @action
  onConnect() {
    this.isConnecting = false;
  }

  @action
  onDisconnect() {
    this.isConnecting = false;
    this.socket = undefined;
  }

  @action
  onError(message) {
    this.error = message;
  }
}
