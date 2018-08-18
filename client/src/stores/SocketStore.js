import { autorun } from 'mobx';
import autobind from 'autobind-decorator';

@autobind
export default class SocketStore {
  constructor(authStore) {
    this.authStore = authStore;

    autorun(() => {
      if (this.authStore.token) {
        console.log('MAKE SOCKET', this.authStore.token);
      } else {
        console.log('DISPOSE SOCKET');
      }

      return 0;
    });
  }
}
