import { action, computed, observable } from 'mobx';
import { ContextInterpreter } from '@grudge/domain/interpreters';
import autobind from 'autobind-decorator';

@autobind
export default class CardStore {
  @observable inspectedCardId = null;

  getCard(cardId) {
    return ContextInterpreter.getCard(this.contextStore.ctx, cardId);
  }

  getCardsForPlayer(playerId) {
    return ContextInterpreter.getCardsForPlayer(this.contextStore.ctx, playerId);
  }

  getPlayedCardsForPlayer(playerId) {
    return ContextInterpreter.getPlayedCardsForPlayer(this.contextStore.ctx, playerId);
  }

  @computed
  get inspectedCard() {
    return this.getCard(this.inspectedCardId);
  }

  @computed
  get hand() {
    return ContextInterpreter.getCardsForPlayer(
      this.contextStore.ctx,
      this.playerStore.currentPlayerId,
    );
  }

  constructor(contextStore, playerStore) {
    this.contextStore = contextStore;
    this.playerStore = playerStore;
  }

  @action
  inspectCard(cardId) {
    this.inspectedCardId = cardId;
  }

  @action
  clearInspectedCard() {
    this.inspectedCardId = null;
  }
}
