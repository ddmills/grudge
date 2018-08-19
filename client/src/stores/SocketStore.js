import { autorun } from 'mobx';
import autobind from 'autobind-decorator';
import io from 'socket.io-client';

@autobind
export default class SocketStore {
  constructor(authStore) {
    this.authStore = authStore;

    autorun(() => {
      this.disposeSocket();

      if (this.authStore.token) {
        this.socket = io({
          query: {
            token: this.authStore.token,
          },
        });

        this.socket.on('error', (message) => {
          console.log('Socket Error:', message);
        });
      }
    });
  }

  disposeSocket() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = undefined;
    }
  }
}
