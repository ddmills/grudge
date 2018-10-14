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
  get selectedUser() {
    return this.users.find((user) => user.id === this.selectedUserId);
  }

  constructor(authStore, lobbyStore) {
    this.authStore = authStore;
    this.lobbyStore = lobbyStore;

    sdk.onUserJoinedLobby(this.addUser);
    sdk.onUserLeftLobby(this.removeUser);
    sdk.onLobbyStarted(this.fetchUsers);
    sdk.onUserMoneyUpdated(this.updateUser);
    sdk.onUserHealthUpdated(this.updateUser);

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
    if (user.id === this.currentUserId) {
      this.currentUser = user;
    }

    const idx = this.users.findIndex((u) => u.id === user.id);

    this.users.splice(idx, 1, user);
  }

  @action
  selectUser(userId) {
    this.selectedUserId = userId;
  }

  @action
  selectDefaultUser() {
    const others = this.users.filter((user) => user.id !== this.currentUserId);

    if (others.length) {
      this.selectUser(others[0].id);
    }
  }

  fetchUsers() {
    if (this.lobbyStore.lobbyId) {
      sdk.getUsersInLobby(this.lobbyStore.lobbyId).then(this.setUsers).then(this.selectDefaultUser);
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
