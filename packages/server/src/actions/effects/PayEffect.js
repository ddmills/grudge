import ActionRefService from 'services/ActionRefService';
import MoneyService from 'services/MoneyService';
import { EffectIds } from '@grudge/data';
import Effect from './Effect';

export default class PayEffect extends Effect {
  static id = EffectIds.PAY;

  static async apply({ value }, { card, user }) {
    const cost = await ActionRefService.resolve(card, value);

    if (Number.isInteger(cost)) {
      return MoneyService.subtract(user.id, cost);
    }
  }
}
