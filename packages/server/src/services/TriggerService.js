import EffectService from 'services/EffectService';
import Logger from 'utilities/Logger';

export default class TriggerService {
  static async onPlayed(card) {
    Logger.info(`trigger onPlayed ${card.cardTypeId}`);
    for (const effect of card.onPlayed) { // eslint-disable-line no-restricted-syntax
      await EffectService.apply(effect, card); // eslint-disable-line no-await-in-loop
    }
  }

  static async onDrawn(card) {
    Logger.info(`trigger onDrawn ${card.cardTypeId}`);
    for (const effect of card.onDrawn) { // eslint-disable-line no-restricted-syntax
      await EffectService.apply(effect, card); // eslint-disable-line no-await-in-loop
    }
  }
}
