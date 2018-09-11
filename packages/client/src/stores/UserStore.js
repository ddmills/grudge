import {
  autorun, computed, action, observable,
} from 'mobx';
import sdk from '@grudge/sdk';
import autobind from 'autobind-decorator';

@autobind
export default class UserStore {
  @observable
  currentUser = null;

  @observable
  selectedUserId = null;

  @observable
  users = [];

  @computed
  get currentUserId() {
    return this.currentUser && this.currentUser.id;
  }

  @computed
  get selectedtUser() {
    return this.users.find((user) => user.id === this.selectedUserId);
  }

  constructor(authStore, lobbyStore) {
    this.authStore = authStore;
    this.lobbyStore = lobbyStore;

    // sdk.onLeftLobby(this.removeAllUsers);
    sdk.onUserJoinedLobby(this.addUser);
    sdk.onUserLeftLobby(this.removeUser);
    sdk.onLobbyStarted(this.fetchUsers);

    autorun(this.fetchCurrentUser);
    autorun(this.fetchUsers);
  }

  @action
  setCurrentUser(user) {
    this.currentUser = user;
  }

  @action
  setUsers(users = []) {
    this.users.replace(users);
  }

  @action
  addUser(user) {
    this.users.push(user);
  }

  @action
  removeUser(user) {
    const filteredUsers = this.users.filter((item) => item.id !== user.id);

    this.setUsers(filteredUsers);
  }

  @action
  updateUser(user) {
    const idx = this.users.findIndex((u) => u.id === user.id);

    this.users[idx] = user;
  }

  @action
  selectUser(userId) {
    this.selectedUserId = userId;
  }

  fetchUsers() {
    if (this.lobbyStore.lobbyId) {
      sdk.getUsersInLobby(this.lobbyStore.lobbyId).then(this.setUsers);
    } else {
      this.setUsers();
    }
  }

  fetchCurrentUser() {
    if (this.authStore.userId) {
      sdk.getUser(this.authStore.userId).then(this.setCurrentUser);
    } else {
      this.setCurrentUser();
    }
  }
}
