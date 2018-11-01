import { action, computed, observable } from 'mobx';
import autobind from 'autobind-decorator';
import sdk from '@grudge/sdk';
import observeClass from 'utilities/mobx/ObservableClass';

@autobind
export default class ContextStore {
  @observable
  context = null;

  @computed
  get players() {
    return this.context ? this.context.players : [];
  }

  @computed
  get isOwner() {
    return this.context && this.context.ownerId === this.authStore.userId;
  }

  @computed
  get isCountdownStarted() {
    return this.context && this.context.isCountdownStarted;
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
  }

  joinContext(contextId) {
    sdk.joinContext(contextId).then(this.onJoinedContext);
  }

  leaveContext() {
    sdk.leaveContext().then(this.onLeftContext);
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

  @action
  onLeftContext() {
    this.context = null;
    this.routerStore.navigate('landing');
  }

  @action
  onJoinedContext(context) {
    this.context = observeClass(context);
  }

  @action
  onPlayerJoined(player) {
    if (this.context) {
      this.context.addPlayer(player);
    }
  }

  @action
  onPlayerLeft(player) {
    if (this.context) {
      this.context.removePlayer(player.id);
    }
  }

  @action
  onCountdownStarted(context) {
    this.context.set('countdownStartedAt', context.countdownStartedAt);
  }

  @action
  onCountdownStopped(context) {
    this.context.set('countdownStartedAt', context.countdownStartedAt);
  }

  @action
  onContextStarted(context) {
    this.context.set('players', context.players);
    this.context.set('startedAt', context.startedAt);
    this.context.set('turnStartedAt', context.turnStartedAt);
  }
}
