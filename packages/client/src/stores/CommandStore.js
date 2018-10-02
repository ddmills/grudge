import autobind from 'autobind-decorator';
import sdk from '@grudge/sdk';

@autobind
export default class CommandStore {
  constructor(cardStore, turnStore) {
    this.cardStore = cardStore;
    this.turnStore = turnStore;
  }

  onClickCard(card) {
    if (
      this.turnStore.isOwnTurn
      && this.cardStore.isOwnCard(card)
      && card.isInHand
      && card.hasTrait('trt-playable')
    ) {
      sdk.playCard(card.id);
    }
  }
}
