import { action, observable, computed } from 'mobx';
import autobind from 'autobind-decorator';
import { ActionSetups } from '@grudge/data';
import sdk from '@grudge/sdk';

@autobind
export default class ActionStore {
  @observable selectedCard;

  @observable targetEnemyCardId;

  @observable targetAllyCardId;

  @observable targetedUserId;

  @observable targetedSlotIndex;

  @observable currentAction;

  @computed
  get allCardActions() {
    const card = this.selectedCard;

    if (!card) {
      return [];
    }

    if (card.isInHand) {
      return card.handActions;
    }

    if (card.isPlayed) {
      return card.playActions;
    }

    return [];
  }

  static isTargetEnemyCardAction(act) {
    return act.setup.some((setup) => setup === ActionSetups.TARGET_ENEMY_CARD);
  }

  static isTargetAllyCardAction(act) {
    return act.setup.some((setup) => setup === ActionSetups.TARGET_ALLY_CARD);
  }

  static isTargetEnemyUserAction(act) {
    return act.setup.some((setup) => setup === ActionSetups.TARGET_ENEMY_USER);
  }

  static isTargetSlotAction(act) {
    return act.setup.some((setup) => setup === ActionSetups.TARGET_OPEN_SLOT);
  }

  @computed
  get validCardActions() {
    return this.allCardActions.filter((act) => {
      const targetEnemyCardMet = ActionStore.isTargetEnemyCardAction(act)
        ? this.targetEnemyCardId
        : true;
      const targetAllyCardMet = ActionStore.isTargetAllyCardAction(act)
        ? this.targetAllyCardId
        : true;
      const targetEnemyUserMet = ActionStore.isTargetEnemyUserAction(act)
        ? this.targetedUserId
        : true;
      const targetSlotIndexMet = ActionStore.isTargetSlotAction(act)
        ? Number.isInteger(this.targetedSlotIndex)
        : true;

      return targetEnemyCardMet
        && targetSlotIndexMet
        && targetEnemyUserMet
        && targetAllyCardMet;
    });
  }

  @computed
  get hasTargetEnemyUserAction() {
    return this.allCardActions.some((act) => ActionStore.isTargetEnemyUserAction(act));
  }

  @computed
  get hasTargetEnemyCardAction() {
    return this.allCardActions.some((act) => ActionStore.isTargetEnemyCardAction(act));
  }

  @computed
  get hasTargetAllyCardAction() {
    return this.allCardActions.some((act) => ActionStore.isTargetAllyCardAction(act));
  }

  @computed
  get hasTargetSlotAction() {
    return this.allCardActions.some((act) => ActionStore.isTargetSlotAction(act));
  }

  get singleAction() {
    const actions = this.validCardActions;

    if (actions.length === 1) {
      return actions[0];
    }

    return undefined;
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
    return card.id === this.targetEnemyCardId || card.id === this.targetAllyCardId;
  }

  @action
  performAction() {
    const act = this.singleAction;

    if (act) {
      sdk.performAction({
        actionIdx: this.allCardActions.indexOf(act),
        cardId: this.selectedCard.id,
        targetCardId: this.targetEnemyCardId || this.targetAllyCardId,
        targetUserId: this.targetedUserId,
        targetSlotIndex: this.targetedSlotIndex,
      });

      this.resetAction();
    }
  }

  @action
  initiateAction(card) {
    this.selectedCard = card;

    this.performAction();
  }

  @action
  resetAction() {
    this.selectedCard = null;
    this.targetEnemyCardId = null;
    this.targetAllyCardId = null;
    this.targetedUserId = null;
    this.targetedSlotIndex = null;
    this.currentAction = null;
  }

  onEnemyCardClicked(card) {
    if (this.hasTargetEnemyCardAction) {
      this.targetEnemyCardId = card.id;

      this.performAction();
    }
  }

  onAllyCardClicked(card) {
    if (this.isCardSelected(card)) {
      this.selectedCard = null;
    } else if (this.hasTargetAllyCardAction && card.isPlayed) {
      this.targetAllyCardId = card.id;

      this.performAction();
    } else {
      this.initiateAction(card);
    }
  }

  onEnemyUserClicked(user) {
    if (this.hasTargetEnemyUserAction) {
      this.targetedUserId = user.id;

      this.performAction();
    }
  }

  onSlotClicked(slotIndex) {
    if (this.hasTargetSlotAction) {
      this.targetedSlotIndex = slotIndex;

      this.performAction();
    }
  }

  onClickCard(card) {
    if (!this.turnStore.isOwnTurn) {
      return;
    }

    if (this.cardStore.isOwnCard(card)) {
      this.onAllyCardClicked(card);
    } else {
      this.onEnemyCardClicked(card);
    }
  }

  getUserHighlight(userId) {
    if (this.hasTargetEnemyUserAction) {
      if (userId !== this.userStore.currentUserId) {
        return 'attack';
      }
    }
  }

  getCardHighlight(userId, slotIndex) {
    if (this.hasTargetSlotAction) {
      const card = this.cardStore.getCardAtSlot(userId, slotIndex);

      if (!card && userId === this.userStore.currentUserId) {
        return 'open';
      }
    }

    if (this.hasTargetEnemyCardAction) {
      const card = this.cardStore.getCardAtSlot(userId, slotIndex);

      if (card && userId !== this.userStore.currentUserId) {
        return 'attack';
      }
    }

    if (this.hasTargetAllyCardAction) {
      const card = this.cardStore.getCardAtSlot(userId, slotIndex);

      if (card && card.isPlayed && userId === this.userStore.currentUserId) {
        return 'heal';
      }
    }
  }
}
