import Model from './Model';

export default class User extends Model {
  static get defaults() {
    return {
      id: undefined,
      name: '',
      displayName: '',
      avatar: '',
      lobbyId: undefined,
      createdAt: undefined,
      turnOrder: undefined,
      money: 0,
      health: 0,
    };
  }

  get isDead() {
    return this.health <= 0;
  }
}
