import { ContextSerializer } from '../serializers/index';
import Model from './Model';
import Player from './Player';
import Card from './Card';

export default class Context extends Model {
  static get schema() {
    return {
      id: {
        defaultValue: undefined,
      },
      ownerId: {
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
      turnStartedAt: {
        defaultValue: null,
      },
      createdAt: {},
      players: {
        defaultValue: [],
        modelClass: Player,
      },
      cards: {
        defaultValue: [],
        modelClass: Card,
      },
      maxNumberOfPlayers: {
        defaultValue: 3,
      },
      turnDuration: {
        defaultValue: 20000,
      },
      countdownDuration: {
        defaultValue: 10000,
      },
      currentTurn: {
        defaultValue: 0,
      },
    };
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

  get turnStartedAtMs() {
    if (this.turnStartedAt) {
      return (new Date(this.turnStartedAt)).getTime();
    }

    return -1;
  }

  get currentTurnPlayer() {
    if (!this.isRunning) {
      return undefined;
    }

    const turnId = this.currentTurn % this.players.length;

    return this.players.find((p) => p.turnOrder === turnId);
  }

  addPlayer(player) {
    if (this.getPlayer(player.id)) {
      this.removePlayer(player.id);
      this.players.push(player);
    } else {
      this.players.push(player);
    }
  }

  isPlayersTurn(playerId) {
    return Boolean(this.currentTurnPlayer && this.currentTurnPlayer.id === playerId);
  }

  isUsersTurn(userId) {
    const player = this.getPlayerForUser(userId);

    return Boolean(player && this.isPlayersTurn(player.id));
  }

  removePlayer(playerId) {
    this.players = this.players.filter((p) => p.id !== playerId);
  }

  getPlayer(playerId) {
    return this.players.find((p) => p.id === playerId);
  }

  getPlayerForUser(userId) {
    return userId ? this.players.find((p) => p.userId === userId) : undefined;
  }

  serialize(userId) {
    return ContextSerializer.serialize(this, userId);
  }

  static deserialize(data) {
    return ContextSerializer.deserialize(data);
  }

  getCardsForPlayer(playerId) {
    return this.cards.filter((c) => c.playerId === playerId);
  }

  getCard(cardId) {
    return this.cards.find((c) => c.cardId === cardId);
  }

  getPlayerForCard(cardId) {
    const card = this.getCard(cardId);

    return card && this.getPlayer(card.playerId);
  }
}
