import { action, observable, computed } from 'mobx';
import autobind from 'autobind-decorator';
import { PreconditionIds } from '@grudge/data';
import sdk from '@grudge/sdk';

@autobind
export default class ActionStore {
  @observable selectedCard;

  @observable targetedCardId;

  @observable targetedSlotIndex;

  @observable currentAction;

  @computed
  get isTargetEnemyAction() {
    return this.currentAction && this.currentAction.preconditions
      .some((precondition) => precondition.id === PreconditionIds.TARGET_CARD_IS_ENEMY);
  }

  @computed
  get isTargetSlotAction() {
    return this.currentAction && this.currentAction.preconditions
      .some((precondition) => precondition.id === PreconditionIds.TARGET_SLOT_INDEX_IS_OPEN);
  }

  preconditionsGathered() {
    const targetEnemyMet = this.isTargetEnemyAction
      ? this.targetedCardId
      : true;
    const targetSlotIndexMet = this.isTargetSlotAction
      ? Number.isInteger(this.targetedSlotIndex)
      : true;

    return targetEnemyMet && targetSlotIndexMet;
  }

  constructor(cardStore, turnStore, userStore) {
    this.cardStore = cardStore;
    this.turnStore = turnStore;
    this.userStore = userStore;

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
    if (this.currentAction && this.isTargetEnemyAction) {
      this.targetedCardId = card.id;

      this.performAction();
    }
  }

  onSlotClicked(slotIndex) {
    if (this.currentAction && this.isTargetSlotAction) {
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

  getHighlight(userId, slotIndex) {
    if (this.isTargetSlotAction) {
      const card = this.cardStore.getCardAtSlot(userId, slotIndex);

      if (!card && userId === this.userStore.currentUserId) {
        return 'open';
      }
    } else if (this.isTargetEnemyAction) {
      const card = this.cardStore.getCardAtSlot(userId, slotIndex);

      if (card && userId !== this.userStore.currentUserId) {
        return 'enemy';
      }
    }
  }
}
