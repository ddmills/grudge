import { RefIds } from '@grudge/data';
import ContextInterrogator from '../ContextInterrogator';

export default class SlotIndexRightResolver {
  static id = RefIds.SLOT_INDEX_RIGHT;

  static resolve(ctx, cardId) {
    const card = ContextInterrogator.getCard(ctx, cardId);
    const slot = card.slotIndex;

    if (Number.isInteger(slot) && slot < 6) {
      return slot + 1;
    }
  }
}
