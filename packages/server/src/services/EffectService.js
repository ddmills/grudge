import effects from '../effects/index';

export default class EffectService {
  static get(effectId) {
    return effects.find((effect) => effect.id === effectId);
  }

  static async apply(effectParams, card) {
    const effect = this.get(effectParams.id);

    await effect.apply(effectParams, card);
  }
}
