import Logger from 'utilities/Logger';
import Effects from 'actions/effects/index';

export default class EffectService {
  static getEffect(effectId) {
    return Effects.find((effect) => effect.id === effectId);
  }

  static execute(context, effectParams, actionData) {
    const effect = this.getEffect(effectParams.id);

    if (!effect) {
      Logger.warn(`Effect ${effectParams.id} not found`);
      return;
    }

    Logger.debug(`Executing effect ${effect.id}`);

    effect.execute(context, effectParams, actionData);
  }

  static executeAll(context, allEffectParams, actionData) {
    allEffectParams.forEach((effectParams) => {
      this.execute(context, effectParams, actionData);
    });
  }
}
