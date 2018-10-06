import EffectService from 'services/EffectService';

export default class Action {
  static id = 'act-action';

  static preconditions = [];

  static effects = [];

  static async perform(card) {
    for (const precondition of this.preconditions) { // eslint-disable-line no-restricted-syntax
      await precondition.validate(card); // eslint-disable-line no-await-in-loop
    }
    await EffectService.applyAll(this.effects, card);
  }
}
