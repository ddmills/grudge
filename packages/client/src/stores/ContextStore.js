import {
  autorun, action, computed, observable,
} from 'mobx';
import autobind from 'autobind-decorator';
import sdk from '@grudge/sdk';
import { ContextAdministrator, ContextInterrogator } from '@grudge/domain/interpreters';

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
    sdk.onContextEnded(this.onContextEnded);
    sdk.onCardDrawn(this.onCardDrawn);
    sdk.onCardDiscarded(this.onCardDiscarded);

    sdk.onHandDrawn(this.onHandDrawn);
    sdk.onCardDisabled(this.onCardDisabled);
    sdk.onCardEnabled(this.onCardEnabled);
    sdk.onPlayerMoneyUpdated(this.onPlayerMoneyUpdated);
    sdk.onPlayerHealthUpdated(this.onPlayerHealthUpdated);
    sdk.onTurnEnded(this.onTurnEnded);

    autorun(this.getCurrentContext);
  }

  @action
  setContext(ctx) {
    this.ctx = ctx;
  }

  getCurrentContext() {
    if (this.authStore.userId) {
      sdk.getCurrentContext().then(this.setContext);
    }
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

  onJoinedContext(ctx) {
    this.setContext(ctx);
  }

  @action
  onPlayerJoined(player) {
    ContextAdministrator.addPlayer(this.ctx, player);
  }

  @action
  onPlayerLeft(playerId) {
    ContextAdministrator.removePlayer(this.ctx, playerId);
  }

  @action
  onCountdownStarted(startedAt) {
    ContextAdministrator.startCountdown(this.ctx, startedAt);
  }

  @action
  onCountdownStopped() {
    ContextAdministrator.stopCountdown(this.ctx);
  }

  @action
  onContextStarted(context) {
    this.ctx = context;
  }

  @action
  onContextEnded(playerId, endedAt) {
    ContextAdministrator.end(this.ctx, playerId, endedAt);
  }

  @action
  onHandDrawn(cardIds, isDiscardRecycled) {
    const player = ContextInterrogator.getPlayerForUser(this.ctx, this.authStore.userId);

    ContextAdministrator.discardHand(this.ctx, player.id);

    if (isDiscardRecycled) {
      ContextAdministrator.recycleDiscardPile(this.ctx, player.id);
    }

    ContextAdministrator.drawCards(this.ctx, cardIds);
  }

  @action
  onCardDrawn(cardId) {
    ContextAdministrator.drawCard(this.ctx, cardId);
  }

  @action
  onCardDiscarded(cardId) {
    ContextAdministrator.discardCard(this.ctx, cardId);
  }

  @action
  onTurnEnded(nextTurn, turnStartedAt) {
    ContextAdministrator.endTurn(this.ctx, nextTurn, turnStartedAt);
  }

  @action
  onCardDisabled(cardId) {
    ContextAdministrator.disableCard(this.ctx, cardId);
  }

  @action
  onCardEnabled(cardId) {
    ContextAdministrator.enableCard(this.ctx, cardId);
  }

  @action
  onPlayerMoneyUpdated(playerId, value) {
    ContextAdministrator.setMoneyForPlayer(this.ctx, playerId, value);
  }

  @action
  onPlayerHealthUpdated(playerId, value) {
    ContextAdministrator.enableCard(this.ctx, playerId, value);
  }
}
