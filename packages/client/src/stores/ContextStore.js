import { action, computed, observable } from 'mobx';
import autobind from 'autobind-decorator';
import sdk from '@grudge/sdk';
import { Context } from '@grudge/domain';

@autobind
export default class ContextStore {
  @observable
  ctxData = null;

  @computed
  get players() {
    return this.ctxData ? this.ctxData.state.players : [];
  }

  @computed
  get ctx() {
    console.log('~ ctx');
    return this.ctxData ? Context.deserialize(this.ctxData) : undefined;
  }

  @computed
  get isOwner() {
    return this.ctxData && this.ctxData.state.ownerId === this.authStore.userId;
  }

  @computed
  get isCountdownStarted() {
    return Boolean(this.ctxData && this.ctxData.state.countdownStartedAt);
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
  }

  joinContext(contextId) {
    sdk.joinContext(contextId).then(this.onJoinedContext);
  }

  leaveContext() {
    sdk.leaveContext().then(this.onLeftContext);
  }

  @action
  onLeftContext() {
    this.ctxData = null;
    this.routerStore.navigate('landing');
  }

  @action
  onJoinedContext(context) {
    this.ctxData = context;
  }

  @action
  onPlayerJoined(player) {
    if (this.ctxData) {
      this.ctxData.state.players.push(player);
    }
  }

  @action
  onPlayerLeft(player) {
    if (this.ctxData) {
      this.ctxData.state.players = this.ctxData.state.players.filter((p) => p.id !== player.id);
    }
  }

  @action
  onCountdownStarted(context) {
    this.ctxData.state.countdownStartedAt = context.state.countdownStartedAt;
  }

  @action
  onCountdownStopped(context) {
    this.ctxData.state.countdownStartedAt = context.state.countdownStartedAt;
  }

  @action
  onContextStarted(context) {
    this.ctxData.state = context.state;
  }

  @action
  onCardDrawn({ id }) {
    const card = this.ctxData.state.cards.find((c) => c.id === id);
    card.isDrawn = true;
  }
}
