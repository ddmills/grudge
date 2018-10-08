import Logger from 'utilities/Logger';
import Effects from '../effects/index';

export default class EffectService {
  static get(effectId) {
    return Effects.find((effect) => effect.id === effectId);
  }

  static async apply(effectParams, card, actionData) {
    const effect = this.get(effectParams.id);

    if (!effect) {
      Logger.warn(`Effect ${effectParams.id} not found`);
    }

    await effect.apply(effectParams, card, actionData);
  }

  static async applyAll(allEffectParams, card, actionData) {
    for (const effectParams of allEffectParams) { // eslint-disable-line no-restricted-syntax
      await this.apply(effectParams, card, actionData); // eslint-disable-line no-await-in-loop
    }
  }
}