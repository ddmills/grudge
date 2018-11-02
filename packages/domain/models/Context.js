import Model from './Model';
import { ContextSerializer } from '../serializers/index';

export default class Context extends Model {
  static get schema() {
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
      cards: {
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
    if (this.getPlayer(player.id)) {
      this.removePlayer(player.id);
      this.players.push(player);
    } else {
      this.players.push(player);
    }
  }

  removePlayer(playerId) {
    this.players = this.players.filter((p) => p.id !== playerId);
  }

  getPlayer(id) {
    return this.players.find((p) => p.id === id);
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

  serialize(user) {
    return ContextSerializer.serialize(this, user);
  }

  static deserialize(data) {
    return ContextSerializer.deserialize(data);
  }
}
