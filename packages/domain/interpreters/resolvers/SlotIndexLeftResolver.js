import { RefIds } from '@grudge/data';
import ContextInterpreter from '../ContextInterpreter';

export default class SlotIndexLeftResolver {
  static id = RefIds.SLOT_INDEX_LEFT;

  static resolve(ctx, cardId) {
    const card = ContextInterpreter.getCard(ctx, cardId);
    const slot = card.slotIndex;

    if (Number.isInteger(slot) && slot > 0) {
      return slot - 1;
    }
  }
}
