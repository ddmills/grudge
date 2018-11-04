export default class ContextInterpreter {
  static isCountdownStarted(ctx) {
    if (!ctx) return false;
    return Boolean(ctx.countdownStartedAt);
  }

  static isEnded(ctx) {
    if (!ctx) return false;
    return Boolean(ctx.endedAt);
  }

  static isStarted(ctx) {
    if (!ctx) return false;
    return Boolean(ctx.startedAt);
  }

  static isRunning(ctx) {
    if (!ctx) return false;
    return this.isStarted(ctx) && !this.isEnded(ctx);
  }

  static isSettingUp(ctx) {
    if (!ctx) return false;
    return !this.isStarted(ctx) && !this.isEnded(ctx);
  }

  static isCountingDown(ctx) {
    if (!ctx) return false;
    return this.isCountdownStarted(ctx) && !this.isStarted(ctx);
  }

  static isFull(ctx) {
    if (!ctx) return false;
    return ctx.players.length >= ctx.maxNumberOfPlayers;
  }

  static turnStartedAtMs(ctx) {
    if (ctx && ctx.turnStartedAt) {
      return (new Date(ctx.turnStartedAt)).getTime();
    }

    return -1;
  }

  static currentTurnPlayer(ctx) {
    if (!ctx) return;
    if (!this.isRunning(ctx)) return;

    const turnId = ctx.currentTurn % ctx.players.length;

    return ctx.players.find((p) => p.turnOrder === turnId);
  }

  static isPlayersTurn(ctx, playerId) {
    if (!ctx) return false;
    const currentTurnPlayer = this.currentTurnPlayer(ctx);

    return Boolean(currentTurnPlayer && currentTurnPlayer.id === playerId);
  }

  static isUsersTurn(ctx, userId) {
    if (!ctx) return false;
    const player = this.getPlayerForUser(ctx, userId);

    return Boolean(player && this.isPlayersTurn(ctx, player.id));
  }

  static isUserOwner(ctx, userId) {
    if (!ctx) return false;
    return ctx.ownerId === userId;
  }

  static getPlayers(ctx) {
    if (!ctx) return [];
    return ctx.players;
  }

  static getPlayer(ctx, playerId) {
    if (!ctx) return;
    return ctx.players.find((p) => p.id === playerId);
  }

  static getPlayerForUser(ctx, userId) {
    if (!ctx) return;
    return ctx.players.find((p) => p.userId === userId);
  }

  static getCardsForPlayer(ctx, playerId) {
    if (!ctx) return [];
    return ctx.cards.filter((c) => c.playerId === playerId);
  }

  static getCard(ctx, cardId) {
    if (!ctx) return;
    return ctx.cards.find((c) => c.id === cardId);
  }

  static getPlayerForCard(ctx, cardId) {
    if (!ctx) return;
    const card = this.getCard(ctx, cardId);

    return card && this.getPlayer(ctx, card.playerId);
  }

  static getPlayedCardsForPlayer(ctx, playerId) {
    if (!ctx) return;
    const cards = this.getCardsForPlayer(this.contextStore.ctx, playerId);

    return cards.filter((c) => c.playerId === playerId);
  }
}
