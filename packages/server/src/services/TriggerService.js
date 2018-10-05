import EffectService from 'services/EffectService';

export default class TriggerService {
  static async onPlayed(card) {
    for (const effect of card.onPlayed) { // eslint-disable-line no-restricted-syntax
      await EffectService.apply(effect, card); // eslint-disable-line no-await-in-loop
    }
  }

  static async onDrawn(card) {
    for (const effect of card.onDrawn) { // eslint-disable-line no-restricted-syntax
      await EffectService.apply(effect, card); // eslint-disable-line no-await-in-loop
    }
  }
}
