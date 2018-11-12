import UserRepository from 'repositories/UserRepository';
import LobbyRepository from 'repositories/LobbyRepository';
import NotificationService from 'services/NotificationService';

export default class MoneyService {
  static async set(userId, money) {
    const id = await UserRepository.updateForId(userId, {
      money,
    });

    const updated = await UserRepository.get(id);
    const lobby = await LobbyRepository.get(updated.lobbyId);

    NotificationService.onPlayerMoneyUpdated(lobby, updated);
  }

  static async add(userId, money) {
    const user = await UserRepository.get(userId);

    await this.set(userId, user.money + money);
  }

  static async subtract(userId, money) {
    const user = await UserRepository.get(userId);

    await this.set(userId, user.money - money);
  }
}
