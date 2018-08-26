import { action, observable } from 'mobx';
import sdk from '@grudge/sdk';
import autobind from 'autobind-decorator';

export default class LobbyListStore {
  @observable
  lobbies = [];

  constructor(authStore) {
    this.authStore = authStore;

    console.log('here');
  }

  @autobind
  @action
  refreshLobbies() {
    console.log('refreshLobbies');
    sdk.listLobbies().then(action((lobbies) => {
      console.log(lobbies);
      this.lobbies = lobbies;
    }));
  }

  createLobby() {
    sdk.createLobby({
      isPublic: true,
    });
  }
}
