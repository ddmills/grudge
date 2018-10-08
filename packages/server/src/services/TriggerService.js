import EffectService from 'services/EffectService';

export default class TriggerService {
  static async onPlayed(card) {
    return EffectService.applyAll(card.onPlayed, { card });
  }

  static async onDrawn(card) {
    return EffectService.applyAll(card.onDrawn, { card });
  }

  static async onDestroyed(card) {
    return EffectService.applyAll(card.onDestroyed, { card });
  }
}
