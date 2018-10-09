import EffectService from 'services/EffectService';

export default class TriggerService {
  static async onPlayed(user, card) {
    return EffectService.applyAll(card.onPlayed, { user, card });
  }

  static async onDrawn(user, card) {
    return EffectService.applyAll(card.onDrawn, { user, card });
  }

  static async onDestroyed(user, card) {
    return EffectService.applyAll(card.onDestroyed, { user, card });
  }
}
