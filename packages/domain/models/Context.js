import Model from './Model';

export default class Context extends Model {
  static get properties() {
    return {
      id: {
        defaultValue: undefined,
      },
      isPublic: {
        defaultValue: true,
      },
      startedAt: {
        defaultValue: null,
      },
      endedAt: {
        defaultValue: null,
      },
      countdownStartedAt: {
        defaultValue: null,
      },
      createdAt: {},
      players: {
        defaultValue: [],
      },
      maxNumberOfPlayers: {
        defaultValue: 3,
      },
      turnDuration: {
        defaultValue: 30000,
      },
      countdownDuration: {
        defaultValue: 10000,
      },
      currentTurn: {
        defaultValue: 0,
      },
    };
  }

  addPlayer(player) {
    this.players.push(player);
  }

  getPlayer(id) {
    this.players.find((p) => p.id === id);
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

  get isRunning() {
    return this.isStarted && !this.isEnded;
  }

  get isSettingUp() {
    return !this.isStarted && !this.isEnded;
  }

  get isCountingDown() {
    return this.isCountdownStarted && !this.isStarted;
  }

  get isFull() {
    return this.players.length >= this.maxNumberOfPlayers;
  }
}
