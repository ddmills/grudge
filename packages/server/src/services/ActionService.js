import CardRepository from 'repositories/CardRepository';
import actions from '../actions/index';

export default class ActionService {
  static get(actionId) {
    return actions.find((action) => action.id === actionId);
  }

  static async performAction(user, actionData, cardId) {
    const action = this.get(actionData.id);

    if (!action) {
      throw new Error(`Action ${actionData.id} does not exist`);
    }

    await action.perform(user, actionData, cardId);

    return CardRepository.get(cardId);
  }
}
