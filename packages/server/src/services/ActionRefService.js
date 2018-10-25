import { RefIds } from '@grudge/data';
import CardService from 'services/CardService';

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

  static async slotIndexLeft(card) {
    const currentSlot = card.slotIndex;

    if (currentSlot && currentSlot > 0) {
      return currentSlot - 1;
    }
  }

  static async slotIndexRight(card) {
    const currentSlot = card.slotIndex;

    if (currentSlot && currentSlot < 6) {
      return currentSlot + 1;
    }
  }

  static async resolve(card, value) {
    if (Array.isArray(value)) {
      return Promise.all(value.map((v) => this.resolve(card, v)));
    }

    return this.isRef(value) ? this.getRefValue(card, value) : value;
  }

  static async getRefValue(card, ref) {
    switch (ref.id) {
      case RefIds.TRAIT:
        return this.trait(card, ref);
      case RefIds.EMPTY_ALLY_SLOT_COUNT:
        return this.emptyAllySlotCount(card, ref);
      case RefIds.SLOT_INDEX_LEFT:
        return this.slotIndexLeft(card, ref);
      case RefIds.SLOT_INDEX_RIGHT:
        return this.slotIndexRight(card, ref);
      default:
        return ref;
    }
  }
}
