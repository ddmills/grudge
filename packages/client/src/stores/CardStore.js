import {
  action, autorun, computed, observable,
} from 'mobx';
import sdk from '@grudge/sdk';
import autobind from 'autobind-decorator';

@autobind
export default class CardStore {
  @observable cards = {};

  getCardsForUser(userId) {
    return Object.values(this.cards).filter((card) => card.isOwnedBy(userId));
  }

  getPlayedCardsForUser(userId) {
    return this.getCardsForUser(userId).filter((card) => card.isPlayed);
  }

  @computed
  get hand() {
    return this.getCardsForUser(this.userStore.currentUserId).filter((card) => card.isInHand);
  }

  @computed
  get selectedUserPlayedCards() {
    const user = this.userStore.selectedUser;

    return this.getPlayedCardsForUser(user);
  }

  @action
  setCard(card) {
    this.cards[card.id] = card;
  }

  setCards(cards) {
    cards.forEach(this.setCard);
  }

  @action
  removeCard(card) {
    delete this.cards[card.id];
  }

  constructor(userStore) {
    this.userStore = userStore;

    sdk.onCardDrawn(this.setCard);
    sdk.onCardDiscarded(this.setCard);
    sdk.onCardTrashed(this.removeCard);
    sdk.onCardPlayed(this.setCard);
    sdk.onCardTraitAdded(this.setCard);
    sdk.onCardTraitRemoved(this.setCard);
    sdk.onConnected(this.fetchHand);

    autorun(this.getPlayedCardsForUsers);
  }

  getCard(cardId) {
    return this.cards[cardId];
  }

  isOwnCard(card) {
    return card.userId === this.userStore.currentUserId;
  }

  fetchHand() {
    sdk.getHand().then(this.setCards);
  }

  getPlayedCardsForUsers() {
    this.userStore.users.forEach((user) => {
      sdk.listPlayedCardsForUser(user.id).then(this.setCards);
    });
  }

  getCardAtSlot(userId, slotIndex) {
    return this.getPlayedCardsForUser(userId).find((card) => card.slotIndex === slotIndex);
  }
}
