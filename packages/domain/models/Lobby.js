import Model from './Model';

export default class Lobby extends Model {
  static get defaults() {
    return {
      id: null,
      ownerId: null,
      isPublic: true,
      createdTimestamp: 0,
    };
  }
}
