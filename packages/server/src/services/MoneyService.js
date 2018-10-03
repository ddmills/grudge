import UserRepository from 'repositories/UserRepository';

export default class MoneyService {
  static async set(userId, amount) {
    return UserRepository.updateForId(userId, {
      money: amount,
    });
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
