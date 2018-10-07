import EffectService from 'services/EffectService';

export default class Action {
  static id = 'act-action';

  static preconditions = [];

  static effects = [];

  static async perform(card, actionData) {
    await Promise.all(this.preconditions.map((precondition) => {
      return precondition.validate(card, actionData);
    }));
    await EffectService.applyAll(this.effects, card, actionData);
  }
}
