import BasicModel from './BasicModel';

export default class Lobby extends BasicModel {
  static get defaults() {
    return {
      id: undefined,
      ownerId: undefined,
      winnerId: undefined,
      isPublic: true,
      currentTurn: 0,
      startedAt: undefined,
      createdAt: undefined,
      endedAt: undefined,
      turnStartedAt: undefined,
      turnDuration: 30000,
      countdownStartedAt: undefined,
      countdownDuration: 10000,
      maxNumberOfPlayers: 3,
    };
  }

  get isRunning() {
    return this.isStarted && !this.isEnded;
  }

  get isSettingUp() {
    return !this.isStarted && !this.isEnded;
  }

  get isCountdownStarted() {
    return Boolean(this.countdownStartedAt);
  }

  get isEnded() {
    return Boolean(this.endedAt);
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

  get turnStartedAtMs() {
    if (this.turnStartedAt) {
      return (new Date(this.turnStartedAt)).getTime();
    }

    return -1;
  }

  pickCurrentTurnUser(users = []) {
    if (this.isStarted) {
      const turnId = this.currentTurn % users.length;

      return users.find((user) => user.turnOrder === turnId);
    }
  }

  pickWinnerUser(users = []) {
    if (this.isEnded && this.winnerId) {
      return users.find((user) => user.id === this.winnerId);
    }
  }
}
