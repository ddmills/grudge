import Logger from 'utilities/Logger';
import MoneyService from 'services/MoneyService';
import Effect from './Effect';

export default class CollectEffect extends Effect {
  static id = 'efx-collect';

  static async apply(trait, card) {
    if (card.hasTrait('trt-value')) {
      const amount = parseInt(card.getTrait('trt-value').value, 10);

      Logger.info(`efx-collect ${amount}`);

      return MoneyService.add(card.userId, amount);
    }
  }
}
