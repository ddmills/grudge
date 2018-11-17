import {
  computed,
  action,
  observable,
  autorun,
} from 'mobx';
import { Player } from '@grudge/domain';
import { ContextInterrogator } from '@grudge/domain/interpreters';
import sdk from '@grudge/sdk';
import autobind from 'autobind-decorator';

@autobind
export default class PlayerStore {
  @observable
  selectedPlayerId = null;

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

  get players() {
    const rawPlayers = ContextInterrogator.getPlayers(this.contextStore.ctx);

    return Player.deserializeAll(rawPlayers);
  }

  @computed
  get currentPlayer() {
    const { ctx } = this.contextStore;
    const { currentUserId } = this.userStore;
    const rawPlayer = ContextInterrogator.getPlayerForUser(ctx, currentUserId);

    return rawPlayer && Player.deserialize(rawPlayer);
  }

  @computed
  get currentPlayerId() {
    return this.currentPlayer ? this.currentPlayer.id : undefined;
  }

  @computed
  get selectedPlayer() {
    return ContextInterrogator.getPlayer(this.contextStore.ctx, this.selectedPlayerId);
  }

  @computed
  get addBotPlayer() {
    if (this.canAddBotPlayer) {
      return () => sdk.addBotPlayer();
    }

    return undefined;
  }

  constructor(contextStore, userStore) {
    this.contextStore = contextStore;
    this.userStore = userStore;

    autorun(this.selectDefaultPlayer);
  }

  getPlayer(playerId) {
    const rawPlayer = ContextInterrogator.getPlayer(this.contextStore.ctx, playerId);

    return rawPlayer ? Player.deserialize(rawPlayer) : undefined;
  }

  getHealthForPlayer(playerId) {
    return ContextInterrogator.getHealthForPlayer(
      this.contextStore.ctx,
      playerId,
    );
  }

  getMoneyForPlayer(playerId) {
    return ContextInterrogator.getMoneyForPlayer(
      this.contextStore.ctx,
      playerId,
    );
  }

  isPlayerSelf(playerId) {
    return playerId === this.currentPlayerId;
  }

  isPlayerEnemy(playerId) {
    return playerId !== this.currentPlayerId;
  }

  @action
  selectPlayer(playerId) {
    this.selectedPlayerId = playerId;
  }

  selectDefaultPlayer() {
    const others = this.players.filter((p) => p.id !== this.currentPlayerId);

    if (others.length) {
      this.selectPlayer(others[0].id);
    } else {
      this.selectPlayer(null);
    }
  }
}
