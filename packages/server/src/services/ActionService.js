import PreconditionService from 'services/PreconditionService';
import EffectService from 'services/EffectService';
import { ContextInterrogator } from '@grudge/domain/interpreters';
import Logger from 'utilities/Logger';
import ContextRepository from 'repositories/ContextRepository';

export default class ActionService {
  static async perform(context, action, actionData) {
    Logger.debug(`Performing action ${action.name}`);

    PreconditionService.validateAll(context, action.preconditions, actionData);
    EffectService.executeAll(context, action.effects, actionData);

    await ContextRepository.save(context);
  }

  static async performHandAction(context, actionData) {
    const action = ContextInterrogator.getHandActionForCard(
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
    const action = ContextInterrogator.getPlayActionForCard(
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
    if (!ContextInterrogator.isUsersTurn(context, user.id)) {
      throw new Error('Cannot perform action on someone elses turn');
    }

    const { cardId } = actionData;
    const { id: playerId } = ContextInterrogator.getPlayerForUser(context, user.id);

    Object.assign(actionData, { playerId });

    if (!ContextInterrogator.isCardOwnedBy(context, cardId, playerId)) {
      throw new Error('Cannot perform action on unowned card');
    }

    if (ContextInterrogator.isCardInHand(context, cardId)) {
      await this.performHandAction(context, actionData);
    } else if (ContextInterrogator.isCardPlayed(context, cardId)) {
      await this.performPlayAction(context, actionData);
    }

    return ContextInterrogator.getCard(context, cardId);
  }
}
