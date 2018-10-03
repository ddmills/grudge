import MoneyService from 'services/MoneyService';
import Effect from './Effect';

export default class CollectEffect extends Effect {
  static id = 'efx-collect';

  static async apply(trait, card) {
    if (card.hasTrait('trt-value')) {
      const amount = card.getTrait('trt-value').value;

      return MoneyService.add(card.userId, amount);
    }
  }
}
