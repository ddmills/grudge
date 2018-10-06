import CardRepository from 'repositories/CardRepository';
import actions from '../actions/index';
import TurnService from './TurnService';

export default class ActionService {
  static get(actionId) {
    return actions.find((action) => action.id === actionId);
  }

  static async performHandAction(card, action, actionData) {
    if (!card.hasHandAction(actionData.id)) {
      throw new Error(`Cannot perform ${actionData.id} when it's not in hand`);
    }

    await action.perform(card, actionData);
  }

  static async performAction(user, actionData, cardId) {
    const action = this.get(actionData.id);

    if (!action) {
      throw new Error(`Action ${actionData.id} does not exist`);
    }

    if (!TurnService.isUsersTurn(user)) {
      throw new Error(`Cannot perform ${action.id} on someone elses turn`);
    }

    const card = await CardRepository.get(cardId);

    if (!card.isOwnedBy(user)) {
      throw new Error(`Cannot perform ${action.id} on unowned card`);
    }

    if (card.isInHand) {
      await this.performHandAction(card, action, actionData);
    }

    return CardRepository.get(cardId);
  }
}
