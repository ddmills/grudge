import Logger from 'utilities/Logger';
import Effects from 'actions/effects/index';

export default class EffectService {
  static get(effectId) {
    return Effects.find((effect) => effect.id === effectId);
  }

  static async apply(effectParams, actionData) {
    const effect = this.get(effectParams.id);

    if (!effect) {
      Logger.warn(`Effect ${effectParams.id} not found`);
    }

    await effect.apply(effectParams, actionData);
  }

  static async applyAll(allEffectParams, actionData) {
    for (const effectParams of allEffectParams) { // eslint-disable-line no-restricted-syntax
      await this.apply(effectParams, actionData); // eslint-disable-line no-await-in-loop
    }
  }
}
