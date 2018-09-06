import Model from './Model';

export default class Lobby extends Model {
  static get defaults() {
    return {
      id: undefined,
      ownerId: undefined,
      isPublic: true,
      isStarted: false,
      createdAt: undefined,
      countdownDuration: 10000,
      countdownStartedAt: undefined,
      maxNumberOfPlayers: 3,
    };
  }

  get countdownStartedAtMs() {
    if (this.countdownStartedAt) {
      return (new Date(this.countdownStartedAt)).getTime();
    }

    return -1;
  }
}
