import CardRepository from 'repositories/CardRepository';
import TurnService from 'services/TurnService';
import actions from '../actions/index';

export default class ActionService {
  static mergeActionData(cardActionData, userActionData) {
    return {
      ...userActionData,
      ...cardActionData,
    };
  }

  static get(actionId) {
    return actions.find((action) => action.id === actionId);
  }

  static async performHandAction(card, action, userActionData) {
    if (!card.hasHandAction(userActionData.id)) {
      throw new Error(`Card does not have hand action ${userActionData.id}`);
    }

    const actionData = this.mergeActionData(card.getHandAction(userActionData.id), userActionData);

    await action.perform(card, actionData);
  }

  static async performPlayAction(card, action, userActionData) {
    if (!card.hasPlayAction(userActionData.id)) {
      throw new Error(`Card does not have play action ${userActionData.id}`);
    }

    const actionData = this.mergeActionData(card.getHandAction(userActionData.id), userActionData);

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

    if (!card.isOwnedBy(user.id)) {
      throw new Error(`Cannot perform ${action.id} on unowned card`);
    }

    if (actionData.targetCardId) {
      const targetCard = await CardRepository.get(actionData.targetCardId);

      Object.assign(actionData, { targetCard });
    }

    if (card.isInHand) {
      await this.performHandAction(card, action, actionData);
    } else if (card.isPlayed) {
      await this.performPlayAction(card, action, actionData);
    }

    return CardRepository.get(cardId);
  }
}
