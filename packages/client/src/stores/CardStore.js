import { action, observable } from 'mobx';
import sdk from '@grudge/sdk';
import autobind from 'autobind-decorator';

@autobind
export default class CardStore {
  @observable hand = [];

  constructor() {
    sdk.onCardDrawn(this.onCardDrawn);
    sdk.onCardDiscarded(this.onCardDiscarded);
  }

  @action
  onCardDrawn(card) {
    this.hand.push(card);
  }

  @action
  onCardDiscarded(card) {
    const filteredCards = this.hand.filter((item) => item.id !== card.id);

    this.hand.replace(filteredCards);
  }
}
