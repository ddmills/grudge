import { action, observable, computed } from 'mobx';
import autobind from 'autobind-decorator';
import { ActionSetups } from '@grudge/data';
import sdk from '@grudge/sdk';

@autobind
export default class ActionStore {
  @observable selectedCardId;

  @observable targetEnemyCardId;

  @observable targetAllyCardId;

  @observable targetPlayerId;

  @observable targetedSlotIndex;

  @observable currentAction;

  @computed
  get selectedCard() {
    return this.selectedCardId ? this.cardStore.getCard(this.selectedCardId) : undefined;
  }

  @computed
  get allCardActions() {
    if (!this.selectedCardId) {
      return [];
    }

    if (this.cardStore.isCardInHand(this.selectedCardId)) {
      return this.selectedCard.handActions;
    }

    if (this.cardStore.isCardPlayed(this.selectedCardId)) {
      return this.selectedCard.playActions;
    }

    return [];
  }

  static isTargetEnemyCardAction(act) {
    return act.setup.some((setup) => setup === ActionSetups.TARGET_ENEMY_CARD);
  }

  static isTargetAllyCardAction(act) {
    return act.setup.some((setup) => setup === ActionSetups.TARGET_ALLY_CARD);
  }

  static isTargetEnemyPlayerAction(act) {
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
      const targetEnemyPlayerMet = ActionStore.isTargetEnemyPlayerAction(act)
        ? this.targetPlayerId
        : true;
      const targetSlotIndexMet = ActionStore.isTargetSlotAction(act)
        ? Number.isInteger(this.targetedSlotIndex)
        : true;

      return targetEnemyCardMet
        && targetSlotIndexMet
        && targetEnemyPlayerMet
        && targetAllyCardMet;
    });
  }

  @computed
  get hasTargetEnemyPlayerAction() {
    return this.allCardActions.some((act) => ActionStore.isTargetEnemyPlayerAction(act));
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

  constructor(cardStore, turnStore, playerStore) {
    this.cardStore = cardStore;
    this.turnStore = turnStore;
    this.playerStore = playerStore;

    sdk.onTurnEnded(this.resetAction);
  }

  isCardSelected(cardId) {
    return cardId === this.selectedCardId;
  }

  isCardTargeted(cardId) {
    return cardId === this.targetEnemyCardId || cardId === this.targetAllyCardId;
  }

  @action
  performAction() {
    const act = this.singleAction;

    if (act) {
      sdk.performAction({
        actionIdx: this.allCardActions.indexOf(act),
        cardId: this.selectedCardId,
        targetCardId: this.targetEnemyCardId || this.targetAllyCardId,
        targetPlayerId: this.targetPlayerId,
        targetSlotIndex: this.targetedSlotIndex,
      });

      this.resetAction();
    }
  }

  @action
  initiateAction(cardId) {
    this.selectedCardId = cardId;

    this.performAction();
  }

  @action
  resetAction() {
    this.selectedCardId = null;
    this.targetEnemyCardId = null;
    this.targetAllyCardId = null;
    this.targetPlayerId = null;
    this.targetedSlotIndex = null;
    this.currentAction = null;
  }

  onEnemyCardClicked(cardId) {
    if (this.hasTargetEnemyCardAction && !this.cardStore.isCardDefended(cardId)) {
      this.targetEnemyCardId = cardId;

      this.performAction();
    }
  }

  onAllyCardClicked(cardId) {
    if (this.isCardSelected(cardId)) {
      this.selectedCardId = null;
    } else if (this.hasTargetAllyCardAction && this.cardStore.isCardPlayed(cardId)) {
      this.targetAllyCardId = cardId;

      this.performAction();
    } else {
      this.initiateAction(cardId);
    }
  }

  onEnemyPlayerClicked(playerId) {
    if (this.hasTargetEnemyPlayerAction) {
      this.targetPlayerId = playerId;

      this.performAction();
    }
  }

  onClickPlayer(playerId) {
    if (this.playerStore.isPlayerEnemy(playerId)) {
      this.onEnemyPlayerClicked(playerId);
    }
  }

  onClickSlot(slotIndex) {
    if (this.hasTargetSlotAction) {
      this.targetedSlotIndex = slotIndex;

      this.performAction();
    }
  }

  onClickCard(cardId) {
    if (!this.turnStore.isOwnTurn) {
      return;
    }

    if (this.cardStore.isOwnCard(cardId)) {
      this.onAllyCardClicked(cardId);
    } else {
      this.onEnemyCardClicked(cardId);
    }
  }

  getPlayerHighlight(playerId) {
    if (this.hasTargetEnemyPlayerAction) {
      if (this.playerStore.isPlayerEnemy(playerId)) {
        return 'attack';
      }
    }
  }

  getCardHighlight(playerId, slotIndex) {
    const card = this.cardStore.getCardAtSlot(playerId, slotIndex);

    if (this.hasTargetSlotAction) {
      if (!card && this.playerStore.isPlayerSelf(playerId)) {
        return 'open';
      }
    }

    if (!card) {
      return;
    }

    const cardId = card.id;

    if (this.hasTargetEnemyCardAction) {
      const isOwnedByEnemy = !this.cardStore.isOwnCard(cardId);
      const isAttackable = !this.cardStore.isCardDefended(cardId);

      if (isAttackable && isOwnedByEnemy) {
        return 'attack';
      }
    }

    if (this.hasTargetAllyCardAction) {
      const isPlayed = this.cardStore.isCardPlayed(cardId);
      const isOwnCard = this.cardStore.isOwnCard(cardId);

      if (isPlayed && isOwnCard) {
        return 'heal';
      }
    }
  }
}
