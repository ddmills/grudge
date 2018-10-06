import EffectService from 'services/EffectService';

export default class Action {
  static id = 'act-action';

  static preconditions = [];

  static effects = [];

  static async perform(card) {
    await Promise.all(this.preconditions.map((precondition) => precondition.validate(card)));
    await EffectService.applyAll(this.effects, card);
  }
}
