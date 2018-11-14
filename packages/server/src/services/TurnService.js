import { ContextAdministrator, ContextInterrogator } from '@grudge/domain/interpreters';
import ContextRepository from 'repositories/ContextRepository';
import NotificationService from 'services/NotificationService';
import DelayedProcessor from 'services/DelayedProcessor';
import timestamp from 'utilities/Timestamp';
import CardService from './CardService';

export default class TurnService {
  static async incrementTurnCounter(ctx) {
    ContextAdministrator.endTurn(ctx, ctx.currentTurn + 1, timestamp());

    await ContextRepository.save(ctx);

    NotificationService.onTurnEnded(ctx);
    DelayedProcessor.scheduleTurn(ctx);

    return ctx;
  }

  static async endPlayerTurn(ctx, playerId) {
    if (ContextInterrogator.isEnded(ctx)) {
      throw new Error('Cannot end turn when the game is over');
    }

    if (!ContextInterrogator.isPlayersTurn(ctx, playerId)) {
      throw new Error('Cannot end someone elses turn');
    }

    await CardService.drawHand(ctx, playerId);

    return this.incrementTurnCounter(ctx);
  }

  static async endTurn(user, ctx) {
    const player = ContextInterrogator.getPlayerForUser(ctx, user.id);

    return this.endPlayerTurn(ctx, player.id);
  }

  static async turnTimeout(contextId, turn) {
    const ctx = await ContextRepository.get(contextId);

    if (ctx.isEnded || !(ctx.currentTurn === turn)) {
      return;
    }

    const player = ContextInterrogator.currentTurnPlayer(ctx);

    return this.endPlayerTurn(ctx, player.id);
  }
}
