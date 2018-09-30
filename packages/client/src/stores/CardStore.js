import { action, observable } from 'mobx';
import sdk from '@grudge/sdk';
import autobind from 'autobind-decorator';

@autobind
export default class CardStore {
  @observable hand = [];

  @observable arena = [];

  constructor() {
    sdk.onCardDrawn(this.onCardDrawn);
    sdk.onCardDiscarded(this.onCardDiscarded);
    sdk.onCardPlayed(this.onCardPlayed);
    sdk.onConnected(this.fetchHand);
  }

  @action
  setHand(cards = []) {
    this.hand.replace(cards);
  }

  @action
  onCardDrawn(card) {
    this.hand.push(card);
  }

  @action
  onCardPlayed(card) {
    console.log(`${card.id} was played`);
  }

  @action
  onCardDiscarded(card) {
    const filteredCards = this.hand.filter((item) => item.id !== card.id);

    this.setHand(filteredCards);
  }

  playCard(card) {
    sdk.playCard(card.id).then(action((c) => {
      this.arena.push(c);
    }));
  }

  fetchHand() {
    sdk.getHand().then(this.setHand);
  }
}
