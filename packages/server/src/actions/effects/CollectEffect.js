import MoneyService from 'services/MoneyService';
import { EffectIds, TraitIds } from '@grudge/data';
import Effect from './Effect';

export default class CollectEffect extends Effect {
  static id = EffectIds.COLLECT;

  static async apply(effectParams, { card }) {
    if (card.hasTrait(TraitIds.VALUE)) {
      const amount = card.getTrait(TraitIds.VALUE).value;

      return MoneyService.add(card.userId, amount);
    }
  }
}
