import autobind from 'autobind-decorator';

@autobind
export default class CommandStore {
  constructor(cardStore, turnStore, actionStore) {
    this.cardStore = cardStore;
    this.turnStore = turnStore;
    this.actionStore = actionStore;
  }

  onClickCard(card) {
    if (this.turnStore.isOwnTurn) {
      if (this.cardStore.isOwnCard(card)) {
        if (card.isInHand) {
          this.actionStore.onHandCardClicked(card);
        }
      } else {
        this.actionStore.onEnemyCardClicked(card);
      }
    }
  }
}
