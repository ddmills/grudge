import Model from './Model';

export default class Card extends Model {
  static get schema() {
    return {
      id: {
        defaultValue: undefined,
      },
      cardTypeId: {
        defaultValue: undefined,
      },
      deckId: {
        defaultValue: undefined,
      },
      playerId: {
        defaultValue: undefined,
      },
      isDrawn: {
        defaultValue: false,
      },
      isDiscarded: {
        defaultValue: false,
      },
      isTrashed: {
        defaultValue: false,
      },
      slotIndex: {
        defaultValue: undefined,
      },
      traits: {
        defaultValue: [],
      },
      handActions: {
        defaultValue: [],
      },
      playActions: {
        defaultValue: [],
      },
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

  isOwnedBy(playerId) {
    return this.playerId === playerId;
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
