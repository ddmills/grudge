import UserRepository from 'repositories/UserRepository';
import LobbyRepository from 'repositories/LobbyRepository';
import NotificationService from 'services/NotificationService';

export default class HealthService {
  static async set(userId, health) {
    const value = health <= 0 ? 0 : health;

    const id = await UserRepository.updateForId(userId, {
      health: value,
    });

    const updated = await UserRepository.get(id);
    const lobby = await LobbyRepository.get(updated.lobbyId);

    NotificationService.onHealthUpdated(lobby, updated);
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
