import autobind from 'autobind-decorator';
import sdk from '@grudge/sdk';

@autobind
export default class CommandStore {
  constructor(cardStore, turnStore, actionStore) {
    this.cardStore = cardStore;
    this.turnStore = turnStore;
    this.actionStore = actionStore;
  }

  onClickCard(card) {
    if (
      this.turnStore.isOwnTurn
      && this.cardStore.isOwnCard(card)
      && card.isInHand
    ) {
      this.actionStore.defaultHandAction(card);
    }
  }
}
