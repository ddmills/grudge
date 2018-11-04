import ContextRepository from 'repositories/ContextRepository';
import NotificationService from 'services/NotificationService';
import DeckService from 'services/DeckService';
import DelayedProcessor from 'services/DelayedProcessor';
import timestamp from 'utilities/Timestamp';
import CardService from 'services/CardService';
import Logger from '../utilities/Logger';

export default class TurnService {
  static async incrementTurnCounter(context) {
    context.set('turnStartedAt', timestamp());
    context.set('currentTurn', context.currentTurn + 1);

    await ContextRepository.save(context);

    NotificationService.onTurnEnded(context);
    DelayedProcessor.scheduleTurn(context);

    return context;
  }

  static async endPlayerTurn(context, player) {
    if (context.isEnded) {
      throw new Error('Cannot end turn when the game is over');
    }

    if (!context.isPlayersTurn(player.id)) {
      throw new Error('Cannot end someone elses turn');
    }

    Logger.debug('endPlayerTurn', context.currentTurn);
    // await DeckService.refreshHand(currentTurnUser);
    // await CardService.enablePlayed(currentTurnUser);

    return this.incrementTurnCounter(context);
  }

  static async endTurn(user, context) {
    const player = context.getPlayerForUser(user.id);

    return this.endPlayerTurn(context, player);
  }

  static async turnTimeout(contextId, turn) {
    const context = await ContextRepository.get(contextId);

    if (context.isEnded || !context.currentTurn === turn) {
      return;
    }

    return this.endPlayerTurn(context, context.currentTurnPlayer);
  }
}
