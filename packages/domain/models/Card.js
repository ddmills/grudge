import { CardLocations } from '@grudge/data';
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
      slotIndex: {
        defaultValue: undefined,
      },
      isDisabled: {
        defaultValue: false,
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
      location: {
        defaultValue: CardLocations.UNKNOWN,
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
    return this.location === CardLocations.ARENA;
  }

  get defaultHandAction() {
    return this.handActions[0];
  }

  get defaultPlayAction() {
    return this.playActions[0];
  }
}
