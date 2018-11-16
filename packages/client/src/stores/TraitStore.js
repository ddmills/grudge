import autobind from 'autobind-decorator';
import { TraitIds } from '@grudge/data';
import sdk from '@grudge/sdk';

@autobind
export default class TraitStore {
  constructor(cardStore, actionRefStore) {
    this.cardStore = cardStore;
    this.actionRefStore = actionRefStore;

    // sdk.onCardTraitAdded(this.cardStore.setCard);
    // sdk.onCardTraitRemoved(this.cardStore.setCard);
  }

  isSlotDefended(userId, slotIndex) {
    const defendedSlots = this.cardStore.getPlayedCardsForUser(userId).reduce((allSlots, c) => {
      if (!c.hasTrait(TraitIds.DEFENDER)) {
        return allSlots;
      }

      const slots = this.actionRefStore.resolve(c, c.getTrait(TraitIds.DEFENDER).slots);

      return [...allSlots, ...slots];
    }, []);

    return defendedSlots.includes(slotIndex);
  }

  isCardDefended(card) {
    return !card.hasTrait(TraitIds.DEFENDER) && this.isSlotDefended(card.userId, card.slotIndex);
  }
}
