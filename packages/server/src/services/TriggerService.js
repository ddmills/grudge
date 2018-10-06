import EffectService from 'services/EffectService';

export default class TriggerService {
  static async onPlayed(card) {
    await EffectService.applyAll(card.onPlayed, card);
  }

  static async onDrawn(card) {
    await EffectService.applyAll(card.onDrawn, card);
  }
}
