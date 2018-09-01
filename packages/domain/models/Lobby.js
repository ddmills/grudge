import Model from './Model';

export default class Lobby extends Model {
  static get defaults() {
    return {
      id: null,
      ownerId: null,
      isPublic: true,
      createdAt: 0,
      maxNumberOfPlayers: 3,
    };
  }

  get numberOfPlayers() {
    return this.maxNumberOfPlayers - 1;
  }

  get isFull() {
    return this.numberOfPlayers >= this.maxNumberOfPlayers;
  }

  get isEmpty() {
    return this.numberOfPlayers <= 0;
  }

  addPlayer(userId) {
    return this.clone({
      playerIds: [...this.playerIds, userId],
    });
  }
}
