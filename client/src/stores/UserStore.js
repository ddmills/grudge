export default class UserStore {
  constructor(socketStore) {
    this.socketStore = socketStore;
    this.name = 'hello';
  }

  getUser(userId) {
    return new Promise((resolve) => {
      setTimeout(() => resolve({
        name: `${this.name} HELLO WORLD ${userId}`,
        id: userId,
      }), 2000);
    });
  }
}
