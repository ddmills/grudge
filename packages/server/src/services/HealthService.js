import UserRepository from 'repositories/UserRepository';
import LobbyRepository from 'repositories/LobbyRepository';
import NotificationService from 'services/NotificationService';
import LobbyService from 'services/LobbyService';

export default class HealthService {
  static async set(userId, health) {
    const value = health <= 0 ? 0 : health;

    const id = await UserRepository.updateForId(userId, {
      health: value,
    });

    const updated = await UserRepository.get(id);
    const lobby = await LobbyRepository.get(updated.lobbyId);

    NotificationService.onPlayerHealthUpdated(lobby, updated);

    if (value === 0) {
      await LobbyService.checkWinCondition(lobby.id);
    }
  }

  static async add(userId, health) {
    const user = await UserRepository.get(userId);

    await this.set(userId, user.health + health);
  }

  static async subtract(userId, health) {
    const user = await UserRepository.get(userId);

    await this.set(userId, user.health - health);
  }
}
