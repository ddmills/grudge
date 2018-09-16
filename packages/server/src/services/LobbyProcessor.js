import BullQueue from 'providers/bull/BullQueue';
import LobbyService from 'services/LobbyService';
import LobbyRepository from 'repositories/LobbyRepository';

const lobbyCountdownQueue = BullQueue.create('lobby:countdown');
const lobbyTurnQueue = BullQueue.create('lobby:turn');

lobbyCountdownQueue.process(async (job) => {
  await LobbyService.start(job.data.lobbyId);
});

lobbyTurnQueue.process(async (job) => {
  const {
    lobbyId,
    turn,
  } = job.data;

  const lobby = await LobbyRepository.get(lobbyId);

  if (lobby.currentTurn === turn) {
    await LobbyService.turnTimeout(lobby);
  }
});

export default class LobbyProcessor {
  static scheduleCountdown(lobby) {
    lobbyCountdownQueue.add({
      lobbyId: lobby.id,
    }, {
      delay: lobby.countdownDuration,
    });
  }

  static scheduleTurn(lobby) {
    lobbyTurnQueue.add({
      lobbyId: lobby.id,
      turn: lobby.currentTurn,
    }, {
      delay: lobby.turnDuration,
    });
  }
}
