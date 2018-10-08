import Model from './Model';

export default class Card extends Model {
  static get defaults() {
    return {
      id: undefined,
      cardTypeId: undefined,
      deckId: undefined,
      userId: undefined,
      createdAt: undefined,
      isDrawn: false,
      isPlayed: false,
      isDiscarded: false,
      isTrashed: false,
      traits: [],
      onPlayed: [],
      onDrawn: [],
      onDestroyed: [],
      handActions: [],
    };
  }

  hasHandAction(actionId) {
    return Boolean(this.getHandAction(actionId));
  }

  getHandAction(actionId) {
    return this.handActions.find((action) => action.id === actionId);
  }

  hasPlayAction(actionId) {
    return Boolean(this.getPlayAction(actionId));
  }

  getPlayAction(actionId) {
    return this.playActions.find((action) => action.id === actionId);
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
