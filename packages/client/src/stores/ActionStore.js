import { action, observable } from 'mobx';
import autobind from 'autobind-decorator';
import { PreconditionIds } from '@grudge/data';
import sdk from '@grudge/sdk';

@autobind
export default class ActionStore {
  @observable selectedCard;

  @observable targetedCardId;

  @observable targetedSlotIndex;

  @observable currentAction;

  static isTargetEnemyAction(actionData) {
    return actionData && actionData.preconditions
      .some((precondition) => precondition.id === PreconditionIds.TARGET_CARD_IS_ENEMY);
  }

  static isTargetSlotAction(actionData) {
    return actionData && actionData.preconditions
      .some((precondition) => precondition.id === PreconditionIds.TARGET_SLOT_INDEX_IS_OPEN);
  }

  preconditionsGathered() {
    const targetEnemyMet = ActionStore.isTargetEnemyAction(this.currentAction)
      ? this.targetedCardId
      : true;
    const targetSlotIndexMet = ActionStore.isTargetSlotAction(this.currentAction)
      ? Number.isInteger(this.targetedSlotIndex)
      : true;

    console.log(targetEnemyMet, targetSlotIndexMet);

    return targetEnemyMet && targetSlotIndexMet;
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
    return card.id === this.targetedCardId;
  }

  @action
  performAction() {
    if (this.preconditionsGathered()) {
      sdk.performAction({
        actionIdx: 0,
        cardId: this.selectedCard.id,
        targetCardId: this.targetedCardId,
        targetSlotIndex: this.targetedSlotIndex,
      });

      this.resetAction();
    }
  }

  @action
  initiateAction(actionData, card) {
    this.currentAction = actionData;
    this.selectedCard = card;

    this.performAction();
  }

  @action
  resetAction() {
    this.selectedCard = null;
    this.targetedCardId = null;
    this.targetedSlotIndex = null;
    this.currentAction = null;
  }

  onHandCardClicked(card) {
    return this.initiateAction(card.defaultHandAction, card);
  }

  onPlayCardClicked(card) {
    return this.initiateAction(card.defaultPlayAction, card);
  }

  onEnemyCardClicked(card) {
    if (this.currentAction && ActionStore.isTargetEnemyAction(this.currentAction)) {
      this.targetedCardId = card.id;

      this.performAction();
    }
  }

  onSlotClicked(slotIndex) {
    console.log('CLICK SLOT', slotIndex, this.currentAction, ActionStore.isTargetSlotAction(this.currentAction));
    if (this.currentAction && ActionStore.isTargetSlotAction(this.currentAction)) {
      this.targetedSlotIndex = slotIndex;

      this.performAction();
    }
  }

  onClickCard(card) {
    if (this.turnStore.isOwnTurn) {
      if (this.cardStore.isOwnCard(card)) {
        if (card.isInHand) {
          this.onHandCardClicked(card);
        } else if (card.isPlayed) {
          this.onPlayCardClicked(card);
        }
      } else {
        this.onEnemyCardClicked(card);
      }
    }
  }
}
