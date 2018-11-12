import { ContextInterrogator } from '@grudge/domain/interpreters';
import PreconditionService from 'services/PreconditionService';
import ContextService from 'services/ContextService';
import EffectService from 'services/EffectService';
import ContextRepository from 'repositories/ContextRepository';
import Logger from 'utilities/Logger';

export default class ActionService {
  static async perform(ctx, action, actionData) {
    Logger.debug(`Performing action ${action.name}`);

    PreconditionService.validateAll(ctx, action.preconditions, actionData);
    EffectService.executeAll(ctx, action.effects, actionData);

    await ContextRepository.save(ctx);
    await ContextService.checkWinCondition(ctx);
  }

  static async performHandAction(ctx, actionData) {
    const action = ContextInterrogator.getHandActionForCard(
      ctx,
      actionData.cardId,
      actionData.actionIdx,
    );

    if (!action) {
      throw new Error(`Card does not have hand action ${actionData.actionIdx}`);
    }

    await this.perform(ctx, action, actionData);
  }

  static async performPlayAction(ctx, actionData) {
    const action = ContextInterrogator.getPlayActionForCard(
      ctx,
      actionData.cardId,
      actionData.actionIdx,
    );

    if (!action) {
      throw new Error(`Card does not have play action ${actionData.actionIdx}`);
    }

    await this.perform(ctx, action, actionData);
  }

  static async performAction(user, ctx, actionData) {
    if (!ContextInterrogator.isUsersTurn(ctx, user.id)) {
      throw new Error('Cannot perform action on someone elses turn');
    }

    const { cardId } = actionData;
    const { id: playerId } = ContextInterrogator.getPlayerForUser(ctx, user.id);

    Object.assign(actionData, { playerId });

    if (!ContextInterrogator.isCardOwnedBy(ctx, cardId, playerId)) {
      throw new Error('Cannot perform action on unowned card');
    }

    if (ContextInterrogator.isCardInHand(ctx, cardId)) {
      await this.performHandAction(ctx, actionData);
    } else if (ContextInterrogator.isCardPlayed(ctx, cardId)) {
      await this.performPlayAction(ctx, actionData);
    }

    return ContextInterrogator.getCard(ctx, cardId);
  }
}
