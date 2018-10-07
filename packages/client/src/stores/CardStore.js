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

    return this.getPlayedCardsForUser(user);
  }

  @computed
  get cards() {
    return this.hand.concat(Object.values(this.users).flat());
  }

  constructor(userStore) {
    this.userStore = userStore;

    sdk.onCardDrawn(this.onCardDrawn);
    sdk.onCardDiscarded(this.onCardDiscarded);
    sdk.onCardPlayed(this.onCardPlayed);
    sdk.onCardTraitAdded(this.onCardUpdated);
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
    if (this.isOwnCard(card)) {
      this.removeCardFromHand(card);
    }

    this.users[card.userId].push(card);
  }

  @action
  onCardDiscarded(card) {
    this.removeCardFromHand(card);
  }

  @action
  onCardUpdated(card) {
    if (this.isOwnCard(card) && card.isInHand) {
      const replaceAt = this.hand.findIndex((c) => c.id === card.id);

      this.hand.splice(replaceAt, 1, card);
    } else if (card.isPlayed) {
      const replaceAt = this.users[card.userId].findIndex((c) => c.id === card.id);

      this.users[card.userId].splice(replaceAt, 1, card);
    }
  }

  @action
  removeCardFromHand(card) {
    this.setHand(this.hand.filter((c) => c.id !== card.id));
  }

  getCard(cardId) {
    return this.cards.find((card) => card.id === cardId);
  }

  isOwnCard(card) {
    return card.userId === this.userStore.currentUserId;
  }

  fetchHand() {
    sdk.getHand().then(this.setHand);
  }

  @action
  setPlayedCardsForUser(userId, cards) {
    if (userId in this.users) {
      this.users[userId].replace(cards);
    } else {
      this.users[userId] = cards;
    }
  }

  getPlayedCardsForUser(userId) {
    return this.users[userId] || [];
  }

  getPlayedCardsForUsers() {
    this.userStore.users.forEach((user) => {
      sdk.listPlayedCardsForUser(user.id).then((cards) => {
        this.setPlayedCardsForUser(user.id, cards);
      });
    });
  }
}
