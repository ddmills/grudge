import EffectService from 'services/EffectService';
import PreconditionService from 'services/PreconditionService';

export default class Action {
  static id = 'act-action';

  static preconditions = [];

  static effects = [];

  static async perform(card, actionData) {
    await PreconditionService.validateAll(this.preconditions, card, actionData);
    await EffectService.applyAll(this.effects, card, actionData);
  }
}
