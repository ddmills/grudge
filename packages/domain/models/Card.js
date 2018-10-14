import Model from './Model';

export default class Card extends Model {
  static get defaults() {
    return {
      id: undefined,
      cardTypeId: undefined,
      deckId: undefined,
      userId: undefined,
      lobbyId: undefined,
      createdAt: undefined,
      isDrawn: false,
      isDiscarded: false,
      isTrashed: false,
      slotIndex: undefined,
      traits: [],
      handActions: [],
      playActions: [],
    };
  }

  getHandAction(idx) {
    return this.handActions[idx];
  }

  getPlayAction(idx) {
    return this.playActions[idx];
  }

  hasTrait(traitId) {
    return Boolean(this.getTrait(traitId));
  }

  getTrait(traitId) {
    return this.traits.find((trait) => trait.id === traitId);
  }

  isOwnedBy(userId) {
    return this.userId === userId;
  }

  get isPlayed() {
    return Number.isInteger(this.slotIndex) && this.slotIndex >= 0;
  }

  get isFresh() {
    return !this.isDrawn && !this.isPlayed && !this.isDiscarded && !this.isTrashed;
  }

  get isInHand() {
    return this.isDrawn && !this.isPlayed && !this.isDiscarded && !this.isTrashed;
  }

  get defaultHandAction() {
    return this.handActions[0];
  }

  get defaultPlayAction() {
    return this.playActions[0];
  }
}
