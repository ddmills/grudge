import { action, computed, observable } from 'mobx';
import autobind from 'autobind-decorator';
import sdk from '@grudge/sdk';
import { ContextInterrogator } from '@grudge/domain/interpreters';
import { CardLocations } from '@grudge/data';

@autobind
export default class ContextStore {
  @observable
  ctx = null;

  @computed
  get isLoading() {
    return Boolean(!this.ctx);
  }

  @computed
  get isOwner() {
    return ContextInterrogator.isUserOwner(this.ctx, this.authStore.userId);
  }

  @computed
  get isRunning() {
    return ContextInterrogator.isRunning(this.ctx);
  }

  @computed
  get isSettingUp() {
    return ContextInterrogator.isSettingUp(this.ctx);
  }

  @computed
  get isFull() {
    return ContextInterrogator.isFull(this.ctx);
  }

  @computed
  get isEnded() {
    return ContextInterrogator.isEnded(this.ctx);
  }

  @computed
  get isCountingDown() {
    return ContextInterrogator.isCountingDown(this.ctx);
  }

  @computed
  get isCountdownStarted() {
    return ContextInterrogator.isCountdownStarted(this.ctx);
  }

  @computed
  get startContextCountdown() {
    if (this.isOwner && !this.isCountdownStarted) {
      return () => sdk.startContextCountdown();
    }

    return undefined;
  }

  @computed
  get stopContextCountdown() {
    if (this.isCountdownStarted) {
      return () => sdk.stopContextCountdown();
    }

    return undefined;
  }

  constructor(authStore, routerStore) {
    this.authStore = authStore;
    this.routerStore = routerStore;

    sdk.onJoinedContext(this.onJoinedContext);
    sdk.onLeftContext(this.onLeftContext);
    sdk.onPlayerJoined(this.onPlayerJoined);
    sdk.onPlayerLeft(this.onPlayerLeft);
    sdk.onCountdownStarted(this.onCountdownStarted);
    sdk.onCountdownStopped(this.onCountdownStopped);
    sdk.onContextStarted(this.onContextStarted);
    sdk.onCardDrawn(this.onCardDrawn);
    sdk.onTurnEnded(this.onTurnEnded);
  }

  joinContext(contextId) {
    sdk.joinContext(contextId).then(this.onJoinedContext);
  }

  leaveContext() {
    sdk.leaveContext().then(this.onLeftContext);
  }

  @action
  onLeftContext() {
    this.ctx = null;
    this.routerStore.navigate('landing');
  }

  @action
  onJoinedContext(context) {
    this.ctx = context;
  }

  @action
  onPlayerJoined(player) {
    if (this.ctx) {
      this.ctx.players.push(player);
    }
  }

  @action
  onPlayerLeft(player) {
    if (this.ctx) {
      this.ctx.players = this.ctx.players.filter((p) => p.id !== player.id);
    }
  }

  @action
  onCountdownStarted(context) {
    this.ctx.countdownStartedAt = context.countdownStartedAt;
  }

  @action
  onCountdownStopped(context) {
    this.ctx.countdownStartedAt = context.countdownStartedAt;
  }

  @action
  onContextStarted(context) {
    this.ctx = context;
  }

  @action
  onCardDrawn({ id }) {
    const card = ContextInterrogator.getCard(this.ctx, id);

    card.location = CardLocations.HAND;
  }

  @action
  onTurnEnded(context) {
    this.ctx.currentTurn = context.currentTurn;
    this.ctx.turnStartedAt = context.turnStartedAt;
  }
}
