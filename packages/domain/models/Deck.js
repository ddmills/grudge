import Model from './Model';

export default class Deck extends Model {
  static get defaults() {
    return {
      id: undefined,
      userId: undefined,
      lobbyId: undefined,
      createdAt: undefined,
    };
  }
}
