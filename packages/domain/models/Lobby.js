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

  get isCountdownStarted() {
    return Boolean(this.countdownStartedAt);
  }

  get countdownStartedAtMs() {
    if (this.isCountdownStarted) {
      return (new Date(this.countdownStartedAt)).getTime();
    }

    return -1;
  }
}
