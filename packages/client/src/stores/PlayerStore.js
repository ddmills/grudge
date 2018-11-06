import { computed } from 'mobx';
import { Player } from '@grudge/domain';
import { ContextInterpreter } from '@grudge/domain/interpreters';
import sdk from '@grudge/sdk';
import autobind from 'autobind-decorator';

@autobind
export default class PlayerStore {
  @computed
  get canAddBotPlayer() {
    const {
      isLoading,
      isSettingUp,
      isOwner,
      isCountingDown,
      isFull,
    } = this.contextStore;

    return Boolean(!isLoading && isSettingUp && isOwner && !isCountingDown && !isFull);
  }

  @computed
  get players() {
    console.log('∆ players');
    const rawPlayers = ContextInterpreter.getPlayers(this.contextStore.ctx);

    return Player.deserializeAll(rawPlayers);
  }

  @computed
  get currentPlayer() {
    const { ctx } = this.contextStore;
    const { currentUserId } = this.userStore;
    const rawPlayer = ContextInterpreter.getPlayerForUser(ctx, currentUserId);

    return rawPlayer && Player.deserialize(rawPlayer);
  }

  @computed
  get currentPlayerId() {
    return this.currentPlayer ? this.currentPlayer.id : undefined;
  }

  @computed
  get addBotPlayer() {
    if (this.canAddBotPlayer) {
      return () => {
        sdk.addBotPlayer();
      };
    }

    return undefined;
  }

  constructor(contextStore, userStore) {
    this.contextStore = contextStore;
    this.userStore = userStore;
  }
}
