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
      traits: [],
      onPlayed: [],
      onDrawn: [],
    };
  }

  hasTrait(traitId) {
    return Boolean(this.getTrait(traitId));
  }

  getTrait(traitId) {
    return this.traits.find((trait) => trait.id === traitId);
  }

  get isFresh() {
    return !this.isDrawn && !this.isPlayed && !this.isDiscarded;
  }

  get isInHand() {
    return this.isDrawn && !this.isPlayed && !this.isDiscarded;
  }
}
