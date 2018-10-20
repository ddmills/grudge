import { RefIds } from '@grudge/data';
import CardService from './CardService';

export default class ActionRefService {
  static isRef(property) {
    return property !== null && typeof property === 'object';
  }

  static async trait(card, ref) {
    if (!card.hasTrait(ref.traitId)) {
      return;
    }

    const property = ref.traitProp || 'value';
    const value = card.getTrait(ref.traitId)[property];

    return this.isRef(value) ? this.getRefValue(card, value) : value;
  }

  static async emptyAllySlotCount(card) {
    const playedCards = await CardService.getPlayedCardsForUser(card.userId);

    return 6 - playedCards.length;
  }

  static async getRefValue(card, ref) {
    if (!this.isRef(ref)) {
      return ref;
    }

    if (ref.id === RefIds.TRAIT) {
      return this.trait(card, ref);
    }

    if (ref.id === RefIds.EMPTY_ALLY_SLOT_COUNT) {
      return this.emptyAllySlotCount(card, ref);
    }

    return ref;
  }
}
