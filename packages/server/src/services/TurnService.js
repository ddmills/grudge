import UserRepository from 'repositories/UserRepository';
import LobbyRepository from 'repositories/LobbyRepository';
import NotificationService from 'services/NotificationService';
import DeckService from 'services/DeckService';
import LobbyProcessor from 'services/LobbyProcessor';
import timestamp from 'utilities/Timestamp';
import CardService from 'services/CardService';

export default class TurnService {
  static async incrementTurnCounter(lobby) {
    const updatedLobby = lobby.clone({
      currentTurn: lobby.currentTurn + 1,
      turnStartedAt: timestamp(),
    });

    await LobbyRepository.save(updatedLobby);

    NotificationService.onTurnEnded(updatedLobby);
    LobbyProcessor.scheduleTurn(updatedLobby);

    return updatedLobby;
  }

  static async endTurn(user) {
    const lobby = await LobbyRepository.get(user.lobbyId);
    const users = await UserRepository.getForLobby(lobby.id);
    const currentTurnUser = lobby.pickCurrentTurnUser(users);

    if (user.id !== currentTurnUser.id) {
      throw new Error('Cannot end someone elses turn');
    }

    await DeckService.refreshHand(currentTurnUser);
    await CardService.enablePlayed(currentTurnUser);

    return this.incrementTurnCounter(lobby);
  }

  static async turnTimeout(lobby) {
    const users = await UserRepository.getForLobby(lobby.id);
    const currentTurnUser = lobby.pickCurrentTurnUser(users);

    this.endTurn(currentTurnUser);
  }

  static async isUsersTurn(user) {
    const lobby = await LobbyRepository.get(user.lobbyId);
    const users = await UserRepository.getForLobby(lobby.id);
    const currentTurnUser = lobby.pickCurrentTurnUser(users);

    return user.id !== currentTurnUser.id;
  }
}
