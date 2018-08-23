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
  socket = null;

  @observable
  isConnected = false;

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
    sdk.configure(token);
    // this.socket = io({
    //   query: {
    //     token,
    //   },
    // });

    sdk.onConnected(this.onConnect.bind(this));
    sdk.onConnected(() => console.log('yoooo'));
    sdk.onConnected(() => console.log('tttest'));
    sdk.onDisconnected(this.onDisconnect.bind(this));
    // sdk.on('error', this.onError.bind(this));
  }

  disconnect() {
    sdk.disconnect();
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
