import PreconditionService from 'services/PreconditionService';
import EffectService from 'services/EffectService';
import { ContextInterpreter } from '@grudge/domain/interpreters';
import Logger from 'utilities/Logger';

export default class ActionService {
  static async perform(context, action, actionData) {
    Logger.debug(`Performing action ${action.name}`);

    PreconditionService.validateAll(context, action.preconditions, actionData);
    // await EffectService.applyAll(action.effects, actionData);
  }

  static async performHandAction(context, actionData) {
    const action = ContextInterpreter.getHandActionForCard(
      context,
      actionData.cardId,
      actionData.actionIdx,
    );

    if (!action) {
      throw new Error(`Card does not have hand action ${actionData.actionIdx}`);
    }

    await this.perform(context, action, actionData);
  }

  static async performPlayAction(context, actionData) {
    const action = ContextInterpreter.getPlayActionForCard(
      context,
      actionData.cardId,
      actionData.actionIdx,
    );

    if (!action) {
      throw new Error(`Card does not have play action ${actionData.actionIdx}`);
    }

    await this.perform(context, action, actionData);
  }

  static async performAction(user, context, actionData) {
    if (!ContextInterpreter.isUsersTurn(context, user.id)) {
      throw new Error('Cannot perform action on someone elses turn');
    }

    const player = ContextInterpreter.getPlayerForUser(context, user.id);
    const card = ContextInterpreter.getCard(context, actionData.cardId);

    if (!ContextInterpreter.isCardOwnedBy(context, card.id, player.id)) {
      throw new Error('Cannot perform action on unowned card');
    }

    if (ContextInterpreter.isCardInHand(context, card.id)) {
      await this.performHandAction(context, actionData);
    } else if (ContextInterpreter.isCardPlayed(context, card.id)) {
      await this.performPlayAction(context, actionData);
    }

    return ContextInterpreter.getCard(context, card.id);
  }
}
