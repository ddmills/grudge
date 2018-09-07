import Model from './Model';

export default class Lobby extends Model {
  static get defaults() {
    return {
      id: undefined,
      ownerId: undefined,
      isPublic: true,
      startedAt: undefined,
      createdAt: undefined,
      countdownStartedAt: undefined,
      countdownDuration: 10000,
      maxNumberOfPlayers: 3
    };
  }

  get isCountdownStarted() {
    return Boolean(this.countdownStartedAt);
  }

  get isStarted() {
    return Boolean(this.startedAt);
  }

  get isCountingDown() {
    return this.isCountdownStarted && !this.isStarted;
  }

  get countdownStartedAtMs() {
    if (this.isCountdownStarted) {
      return (new Date(this.countdownStartedAt)).getTime();
    }

    return -1;
  }
}
