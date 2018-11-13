import { action, computed, observable } from 'mobx';
import autobind from 'autobind-decorator';
import sdk from '@grudge/sdk';
import { ContextAdministrator, ContextInterrogator } from '@grudge/domain/interpreters';
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
    sdk.onContextEnded(this.onContextEnded);
    sdk.onCardDrawn(this.onCardDrawn);

    sdk.onCardDisabled(this.onCardDisabled);
    sdk.onCardEnabled(this.onCardEnabled);
    sdk.onPlayerMoneyUpdated(this.onPlayerMoneyUpdated);
    sdk.onPlayerHealthUpdated(this.onPlayerHealthUpdated);

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
  onCardDrawn(cardId) {
    const card = ContextInterrogator.getCard(this.ctx, cardId);

    card.location = CardLocations.HAND;
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
