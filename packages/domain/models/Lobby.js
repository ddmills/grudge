import Model from './Model';

export default class Lobby extends Model {
  static get defaults() {
    return {
      id: undefined,
      ownerId: undefined,
      isPublic: true,
      createdAt: undefined,
      maxNumberOfPlayers: 3,
    };
  }
}
