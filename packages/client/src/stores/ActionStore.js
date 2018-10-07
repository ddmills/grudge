import { action, observable } from 'mobx';
import autobind from 'autobind-decorator';
import { ActionIds } from '@grudge/data';
import sdk from '@grudge/sdk';

@autobind
export default class ActionStore {
  @observable selectedCard;

  @observable targetedCard;

  @observable currentAction;

  static isTargetEnemyAction(actionData) {
    return actionData && [
      ActionIds.ATTACK,
    ].includes(actionData.id);
  }

  constructor(cardStore, turnStore) {
    this.cardStore = cardStore;
    this.turnStore = turnStore;

    sdk.onTurnEnded(this.resetAction);
  }

  isCardSelected(card) {
    return this.selectedCard && card.id === this.selectedCard.id;
  }

  isCardTargeted(card) {
    return this.targetedCard && card.id === this.targetedCard.id;
  }

  @action
  perform(actionData, card) {
    if (ActionStore.isTargetEnemyAction(actionData)) {
      this.selectedCard = card;
      this.currentAction = actionData;

      return;
    }

    this.selectedCard = null;
    this.targetedCard = null;

    return sdk.performAction(actionData, card.id);
  }

  @action
  resetAction() {
    this.selectedCard = null;
    this.targetedCard = null;
    this.currentAction = null;
  }

  onHandCardClicked(card) {
    return this.perform(card.defaultHandAction, card);
  }

  onEnemyCardClicked(card) {
    if (ActionStore.isTargetEnemyAction(this.currentAction) && this.selectedCard) {
      this.targetedCard = card;

      sdk.performAction({
        ...this.currentAction,
        targetCardId: card.id,
      }, this.selectedCard.id).then(this.resetAction);
    }
  }

  onClickCard(card) {
    if (this.turnStore.isOwnTurn) {
      if (this.cardStore.isOwnCard(card)) {
        if (card.isInHand) {
          this.onHandCardClicked(card);
        }
      } else {
        this.onEnemyCardClicked(card);
      }
    }
  }
}
