import { action, computed, observable } from 'mobx';
import { Card } from '@grudge/domain';
import { ContextInterpreter } from '@grudge/domain/interpreters';
import autobind from 'autobind-decorator';

@autobind
export default class CardStore {
  @observable inspectedCardId = null;

  getCard(cardId) {
    const rawCard = ContextInterpreter.getCard(this.contextStore.ctx, cardId);

    return rawCard && Card.create(rawCard);
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
    return ContextInterpreter.getHandForPlayer(
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

  getCardAtSlot(playerId, slotIndex) {
    return undefined;
  }
}
