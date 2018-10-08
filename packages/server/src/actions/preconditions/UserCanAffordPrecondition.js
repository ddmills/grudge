import { TraitIds, PreconditionIds } from '@grudge/data';
import UserRepository from 'repositories/UserRepository';
import Precondition from './Precondition';

export default class UserCanAffordPrecondition extends Precondition {
  static id = PreconditionIds.USER_CAN_AFFORD;

  static async validate(card) {
    if (!card.hasTrait(TraitIds.COST)) {
      return;
    }

    const cost = card.getTrait(TraitIds.COST).value;
    const user = await UserRepository.get(card.userId);

    if (user.money < cost) {
      throw new Error(`User cannot afford cost of card ${card.id}`);
    }
  }
}
