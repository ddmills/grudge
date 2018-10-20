import ActionRefService from 'services/ActionRefService';
import MoneyService from 'services/MoneyService';
import { EffectIds } from '@grudge/data';
import Effect from './Effect';

export default class CollectEffect extends Effect {
  static id = EffectIds.COLLECT;

  static async apply({ value }, { card }) {
    const amount = await ActionRefService.getRefValue(card, value);

    if (Number.isInteger(amount)) {
      return MoneyService.add(card.userId, amount);
    }
  }
}
