import BasicModel from './BasicModel';

export default class User extends BasicModel {
  static get defaults() {
    return {
      id: undefined,
      name: '',
      displayName: '',
      avatar: '',
      lobbyId: undefined,
      contextId: undefined,
      createdAt: undefined,
      turnOrder: undefined,
      money: 0,
      health: 0,
    };
  }

  get isDead() {
    return this.health <= 0;
  }

  get isAlive() {
    return this.health > 0;
  }
}
