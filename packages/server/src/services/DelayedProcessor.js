import BullQueue from 'providers/bull/BullQueue';
import ContextService from 'services/ContextService';
import TurnService from 'services/TurnService';
import ContextRepository from 'repositories/ContextRepository';
import Logger from 'utilities/Logger';

const contextCountdownQueue = BullQueue.create('context:countdown');
const contextTurnQueue = BullQueue.create('context:turn');

contextCountdownQueue.process(async (job) => {
  await ContextService.start(job.data.contextId);
});

contextTurnQueue.process(async (job) => {
  const {
    contextId,
    turn,
  } = job.data;

  const context = await ContextRepository.get(contextId);

  if (!context.isEnded && context.currentTurn === turn) {
    await TurnService.turnTimeout(context);
  }
});

export default class DelayedProcessor {
  static scheduleCountdown(context) {
    contextCountdownQueue.add({
      contextId: context.id,
    }, {
      delay: context.countdownDuration,
    });
  }

  static async cancelCountdown(context) {
    const jobs = await contextCountdownQueue.getJobs();
    const ctxJobs = jobs.filter((j) => j.data.contextId === context.id);

    try {
      await Promise.all(ctxJobs.map((j) => j.remove()));
    } catch (error) {
      Logger.error(error);
      throw new Error(`Failed to cancel the lobby countdown for game ${context.id}`);
    }
  }

  static scheduleTurn(context) {
    contextTurnQueue.add({
      contextId: context.id,
      turn: context.currentTurn,
    }, {
      delay: context.turnDuration,
    });
  }
}
