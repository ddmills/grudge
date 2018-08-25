import {
  action, autorun, observable,
} from 'mobx';
import sdk from 'sdk/index';

export default class SocketStore {
  @observable
  isConnecting = false;

  @observable
  error = null;

  @observable
  isConnected = false;

  constructor(authStore) {
    this.authStore = authStore;

    autorun(() => {
      if (this.authStore.token) {
        this.connect(this.authStore.token);
      } else {
        sdk.disconnect();
      }
    });
  }

  @action
  connect(token) {
    this.isConnecting = true;
    sdk.configure(token);
    sdk.onConnected(this.onConnect.bind(this));
    sdk.onDisconnected(this.onDisconnect.bind(this));
    sdk.onError(this.onError.bind(this));
  }

  @action
  onConnect() {
    this.isConnecting = false;
    this.isConnected = true;
  }

  @action
  onDisconnect() {
    this.isConnecting = false;
    this.isConnected = false;
  }

  @action
  onError(message) {
    this.error = message;
  }
}
