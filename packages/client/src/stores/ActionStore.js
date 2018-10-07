import { observable } from 'mobx';
import autobind from 'autobind-decorator';
import { ActionIds } from '@grudge/data';
import sdk from '@grudge/sdk';

@autobind
export default class ActionStore {
  @observable selectedCard;

  @observable targetedCard;

  @observable currentAction;

  static isTargetEnemyAction(action) {
    return action && [
      ActionIds.ATTACK,
    ].includes(action.id);
  }

  perform(action, card) {
    if (ActionStore.isTargetEnemyAction(action)) {
      this.selectedCard = card;
      this.currentAction = action;

      return;
    }

    this.selectedCard = null;
    this.targetedCard = null;

    return sdk.performAction(action, card.id);
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
      }, this.selectedCard.id).then(() => {
        this.selectedCard = null;
        this.targetedCard = null;
        this.currentAction = null;
        console.log('ACTION COMPLETED');
      });
    }
  }
}
