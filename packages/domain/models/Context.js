import Model from './Model';

export default class Context extends Model {
  static get properties() {
    return {
      id: {
        defaultValue: undefined,
      },
      createdAt: {
        defaultValue: undefined,
      },
      players: {
        defaultValue: [],
      },
      currentTurn: {
        defaultValue: 0,
      },
    };
  }

  addPlayer(player) {
    this.players.push(player);
  }
}
