import { TraitIds } from '@grudge/data';
import UserRepository from 'repositories/UserRepository';
import Precondition from './Precondition';
import Logger from 'utilities/Logger';

export default class UserCanAffordPrecondition extends Precondition {
  static id = 'pcd-user-can-afford';

  static async validate(card) {
    if (!card.hasTrait(TraitIds.COST)) {
      return;
    }

    const cost = card.getTrait(TraitIds.COST).value;
    const user = await UserRepository.get(card.userId);

    Logger.info(cost, user.money);

    if (user.money < cost) {
      throw new Error(`User cannot afford cost of card ${card.id}`);
    }
  }
}
