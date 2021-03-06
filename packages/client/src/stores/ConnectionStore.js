import { action, observable } from 'mobx';
import sdk from '@grudge/sdk';

export default class ConnectionStore {
  @observable
  isConnecting = false;

  @observable
  error = null;

  @observable
  isConnected = false;

  constructor() {
    sdk.onConnecting(this.onConnecting.bind(this));
    sdk.onConnected(this.onConnect.bind(this));
    sdk.onDisconnected(this.onDisconnect.bind(this));
    sdk.onError(this.onError.bind(this));
    // sdk.onFlash((data) => console.debug('flash', data)); // eslint-disable-line no-console
  }

  @action
  onConnecting() {
    this.onConnecting = true;
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
  onError(error) {
    this.error = error;
    console.error(`SDK error ${error.message}`); // eslint-disable-line no-console
  }
}
