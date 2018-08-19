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
        console.log('MAKE SOCKET');
        this.socket = io({
          query: {
            token: this.authStore.token,
          },
        });
      }
    });
  }

  disposeSocket() {
    if (this.socket) {
      console.log('DISPOSE SOCKET');
      this.socket.disconnect();
      this.socket = undefined;
    }
  }
}
