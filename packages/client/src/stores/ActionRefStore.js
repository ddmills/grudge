import autobind from 'autobind-decorator';
import { RefIds } from '@grudge/data';

@autobind
export default class ActionStore {
  static isRef(property) {
    return property !== null && typeof property === 'object';
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

    return ActionStore.isRef(value) ? this.getRefValue(card, value) : value;
  }

  constructor(cardStore) {
    this.cardStore = cardStore;
  }

  getRefValue(card, ref) {
    if (!ActionStore.isRef(ref)) {
      return ref;
    }

    switch (ref.id) {
      case RefIds.EMPTY_ALLY_SLOT_COUNT:
        return this.emptyAllySlotCount(card, ref);
      case RefIds.TRAIT:
        return this.trait(card, ref);
      default:
        return ref;
    }
  }
}
