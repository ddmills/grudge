import UserRepository from 'repositories/UserRepository';
import NotificationService from './NotificationService';
import LobbyRepository from '../repositories/LobbyRepository';

export default class MoneyService {
  static async set(userId, amount) {
    const id = await UserRepository.updateForId(userId, {
      money: amount,
    });

    const updated = await UserRepository.get(id);
    const lobby = await LobbyRepository.get(updated.lobbyId);

    NotificationService.onMoneyUpdated(lobby, updated);
  }

  static async add(userId, amount) {
    const user = await UserRepository.get(userId);

    await this.set(userId, user.money + amount);
  }

  static async subtract(userId, amount) {
    const user = await UserRepository.get(userId);

    await this.set(userId, user.money - amount);
  }
}
