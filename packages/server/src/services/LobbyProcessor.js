import BullQueue from 'providers/bull/BullQueue';
import LobbyService from 'services/LobbyService';

const lobbyCountdownQueue = BullQueue.create('lobby:countdown');

lobbyCountdownQueue.process(async (job) => {
  await LobbyService.start(job.data.lobbyId);
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
