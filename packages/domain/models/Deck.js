import BasicModel from './BasicModel';

export default class Deck extends BasicModel {
  static get defaults() {
    return {
      id: undefined,
      userId: undefined,
      lobbyId: undefined,
      createdAt: undefined,
    };
  }
}
