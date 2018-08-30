import Model from './Model';

export default class Lobby extends Model {
  static get defaults() {
    return {
      id: null,
      ownerId: null,
      isPublic: true,
      createdTimestamp: 0,
      maxNumberOfPlayers: 3,
      playerIds: [],
    };
  }

  get numberOfPlayers() {
    return this.playerIds.length;
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
