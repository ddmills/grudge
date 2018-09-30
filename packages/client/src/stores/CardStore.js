import {
  action, autorun, computed, observable,
} from 'mobx';
import sdk from '@grudge/sdk';
import autobind from 'autobind-decorator';

@autobind
export default class CardStore {
  @observable hand = [];

  @observable users = {};

  @computed
  get selectedUserPlayedCards() {
    const user = this.userStore.selectedUser;

    if (user && user.id in this.users) {
      return this.users[user.id];
    }

    return [];
  }

  constructor(userStore) {
    this.userStore = userStore;

    sdk.onCardDrawn(this.onCardDrawn);
    sdk.onCardDiscarded(this.onCardDiscarded);
    sdk.onCardPlayed(this.onCardPlayed);
    sdk.onConnected(this.fetchHand);

    autorun(this.getPlayedCardsForUsers);
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
    this.users[card.userId].push(card);
  }

  @action
  onCardDiscarded(card) {
    const filteredCards = this.hand.filter((item) => item.id !== card.id);

    this.setHand(filteredCards);
  }

  @action
  removeCardFromHand(card) {
    this.hand.replace(this.hand.filter((c) => c.id !== card.id));
  }

  playCard(card) {
    sdk.playCard(card.id).then(this.removeCardFromHand);
  }

  fetchHand() {
    sdk.getHand().then(this.setHand);
  }

  @action
  setPlayedCardsForUser(userId, cards) {
    this.users[userId].replace(cards);
  }

  @action
  getPlayedCardsForUsers() {
    this.userStore.users.forEach((user) => {
      this.users[user.id] = [];
      sdk.listPlayedCardsForUser(user.id).then((cards) => {
        this.setPlayedCardsForUser(user.id, cards);
      });
    });
  }
}
