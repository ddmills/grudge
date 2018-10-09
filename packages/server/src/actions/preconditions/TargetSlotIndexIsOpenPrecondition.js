import { PreconditionIds } from '@grudge/data';
import CardRepository from 'repositories/CardRepository';
import Precondition from './Precondition';

export default class TargetSlotIndexIsOpenPrecondition extends Precondition {
  static id = PreconditionIds.TARGET_SLOT_INDEX_IS_OPEN;

  static async validate(preconditionParams, { user, targetSlotIndex }) {
    const isValidSlotIndex = Number.isInteger(targetSlotIndex)
      && targetSlotIndex >= 0
      && targetSlotIndex <= 6;

    if (!isValidSlotIndex) {
      throw new Error(`Target slot ${targetSlotIndex} is not valid`);
    }

    const allCards = await CardRepository.findForUser(user.id, user.lobbyId);
    const isSlotIndexTaken = allCards.some((c) => c.isPlayed && c.slotIndex === targetSlotIndex);

    if (isSlotIndexTaken) {
      throw new Error(`Target slot ${targetSlotIndex} is not open`);
    }
  }
}
