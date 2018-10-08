import MoneyService from 'services/MoneyService';
import { EffectIds, TraitIds } from '@grudge/data';
import Effect from './Effect';

export default class PayEffect extends Effect {
  static id = EffectIds.PAY;

  static async apply(effectParams, card) {
    if (card.hasTrait(TraitIds.COST)) {
      const amount = card.getTrait(TraitIds.COST).value;

      return MoneyService.subtract(card.userId, amount);
    }
  }
}
