import { PreconditionIds } from '@grudge/data';
import { ContextInterpreter } from '@grudge/domain/interpreters';
import CardRepository from 'repositories/CardRepository';
import Precondition from './Precondition';

export default class TargetSlotIndexIsOpenPrecondition extends Precondition {
  static id = PreconditionIds.TARGET_SLOT_INDEX_IS_OPEN;

  static async validate(context, preconditionParams, { playerId, targetSlotIndex }) {
    const isValidSlotIndex = Number.isInteger(targetSlotIndex)
      && targetSlotIndex >= 0
      && targetSlotIndex <= 6;

    if (!isValidSlotIndex) {
      throw new Error(`Target slot ${targetSlotIndex} is not valid`);
    }

    const cardAtSlot = ContextInterpreter.getCardAtSlot(context, playerId, targetSlotIndex);

    if (cardAtSlot) {
      throw new Error(`Target slot ${targetSlotIndex} is not open`);
    }
  }
}
