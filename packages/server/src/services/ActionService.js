import CardRepository from 'repositories/CardRepository';
import TurnService from 'services/TurnService';
import PreconditionService from 'services/PreconditionService';
import EffectService from 'services/EffectService';
import Logger from '../utilities/Logger';

export default class ActionService {
  static async perform(action, actionData) {
    Logger.log(`Performing action: ${action.name}`);
    await PreconditionService.validateAll(action.preconditions, actionData);
    await EffectService.applyAll(action.effects, actionData);
  }

  static async performHandAction(actionData) {
    const action = actionData.card.getHandAction(actionData.actionIdx);

    if (!action) {
      throw new Error(`Card does not have hand action ${actionData.actionIdx}`);
    }

    await this.perform(action, actionData);
  }

  static async performPlayAction(actionData) {
    const action = actionData.card.getPlayAction(actionData.actionIdx);

    if (!action) {
      throw new Error(`Card does not have play action ${actionData.actionIdx}`);
    }

    await this.perform(action, actionData);
  }

  static async performAction(user, actionData) {
    if (!TurnService.isUsersTurn(user)) {
      throw new Error('Cannot perform action on someone elses turn');
    }

    const card = await CardRepository.get(actionData.cardId);

    if (!card.isOwnedBy(user.id)) {
      throw new Error('Cannot perform action on unowned card');
    }

    Object.assign(actionData, { card, user });

    if (actionData.targetCardId) {
      const targetCard = await CardRepository.get(actionData.targetCardId);

      Object.assign(actionData, { targetCard });
    }

    if (card.isInHand) {
      await this.performHandAction(actionData);
    } else if (card.isPlayed) {
      await this.performPlayAction(actionData);
    }

    return CardRepository.get(actionData.cardId);
  }
}
