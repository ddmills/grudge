import BullQueue from 'providers/bull/BullQueue';
import LobbyRepository from 'repositories/LobbyRepository';
import timestamp from 'utilities/Timestamp';
import Logger from 'utilities/Logger';
import NotificationService from './NotificationService';

const lobbyCountdownQueue = BullQueue.create('lobby:countdown');

lobbyCountdownQueue.process(async (job) => {
  const lobby = await LobbyRepository.get(job.data.lobbyId);

  if (!lobby.isCountdownStarted) {
    throw new Error('Lobby countdown has been cancelled');
  }

  if (lobby.isStarted) {
    throw new Error('Lobby has already started');
  }

  const updatedLobby = lobby.clone({
    startedAt: timestamp(),
  });

  await LobbyRepository.save(updatedLobby);

  const accuracy = (Date.now() - lobby.countdownStartedAtMs) - lobby.countdownDuration;
  Logger.info(`Countdown Processor starting lobby. Countdown Accruacy = ${accuracy}ms`);

  NotificationService.onLobbyCountdownStarted(updatedLobby);
});

export default class LobbyProcessor {
  static scheduleCountdown(lobby) {
    lobbyCountdownQueue.add({
      lobbyId: lobby.id,
    }, {
      delay: lobby.countdownDuration,
    });
  }
}
