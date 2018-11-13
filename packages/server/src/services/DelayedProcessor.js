import BullQueue from 'providers/bull/BullQueue';
import ContextService from 'services/ContextService';
import TurnService from 'services/TurnService';
import Logger from 'utilities/Logger';

const contextCountdownQueue = BullQueue.create('context:countdown');
const contextTurnQueue = BullQueue.create('context:turn');

contextCountdownQueue.process(async (job) => {
  return ContextService.start(job.data.contextId);
});

contextTurnQueue.process(async (job) => {
  const {
    contextId,
    turn,
  } = job.data;

  return TurnService.turnTimeout(contextId, turn);
});

const logError = (type) => (error) => {
  Logger.error(`DelayedProcessor ${type}`, error);
};

const logJobError = (type) => (job, error) => {
  Logger.error(`DelayedProcessor job ${type}.`, error);
};

contextCountdownQueue.on('error', logError('error'));
contextCountdownQueue.on('failed', logJobError('failed'));
contextCountdownQueue.on('stalled', logJobError('stalled'));
contextTurnQueue.on('error', logError('error'));
contextTurnQueue.on('failed', logJobError('failed'));
contextTurnQueue.on('stalled', logJobError('stalled'));

export default class DelayedProcessor {
  static scheduleCountdown(context) {
    contextCountdownQueue.add({
      contextId: context.id,
    }, {
      delay: context.countdownDuration,
    });
  }

  static async stopCountdown(context) {
    const jobs = await contextCountdownQueue.getJobs();
    const ctxJobs = jobs.filter((j) => j.data.contextId === context.id);

    try {
      await Promise.all(ctxJobs.map((j) => j.remove()));
    } catch (error) {
      Logger.error(error);
      throw new Error(`Failed to stop the lobby countdown for game ${context.id}`);
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
