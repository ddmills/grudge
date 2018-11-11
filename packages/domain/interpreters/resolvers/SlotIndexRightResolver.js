import { RefIds } from '@grudge/data';
import ContextInterpreter from '../ContextInterpreter';

export default class SlotIndexRightResolver {
  static id = RefIds.SLOT_INDEX_RIGHT;

  static resolve(ctx, cardId) {
    const card = ContextInterpreter.getCard(ctx, cardId);
    const slot = card.slotIndex;

    if (Number.isInteger(slot) && slot < 6) {
      return slot + 1;
    }
  }
}
