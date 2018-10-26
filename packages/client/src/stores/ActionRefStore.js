import autobind from 'autobind-decorator';
import { RefIds } from '@grudge/data';

@autobind
export default class ActionStore {
  constructor(cardStore) {
    this.cardStore = cardStore;
  }

  static isRef(property) {
    return property !== null && typeof property === 'object';
  }

  static slotIndexLeft(card) {
    const currentSlot = card.slotIndex;

    if (currentSlot && currentSlot > 0) {
      return currentSlot - 1;
    }
  }

  static slotIndexRight(card) {
    const currentSlot = card.slotIndex;

    if (currentSlot && currentSlot < 6) {
      return currentSlot + 1;
    }
  }

  emptyAllySlotCount(card) {
    return 6 - this.cardStore.getPlayedCardsForUser(card.userId).length;
  }

  trait(card, ref) {
    if (!card.hasTrait(ref.traitId)) {
      return;
    }

    const property = ref.traitProp || 'value';
    const value = card.getTrait(ref.traitId)[property];

    return this.resolve(card, value);
  }

  getRefValue(card, ref) {
    switch (ref.id) {
      case RefIds.EMPTY_ALLY_SLOT_COUNT:
        return this.emptyAllySlotCount(card, ref);
      case RefIds.TRAIT:
        return this.trait(card, ref);
      case RefIds.SLOT_INDEX_LEFT:
        return ActionStore.slotIndexLeft(card);
      case RefIds.SLOT_INDEX_RIGHT:
        return ActionStore.slotIndexRight(card);
      default:
        return ref;
    }
  }

  resolve(card, value) {
    if (Array.isArray(value)) {
      return value.map((v) => this.resolve(card, v));
    }

    return ActionStore.isRef(value) ? this.getRefValue(card, value) : value;
  }
}
