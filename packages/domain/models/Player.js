import Model from './Model';

export default class Player extends Model {
  static get schema() {
    return {
      id: {
        defaultValue: undefined,
      },
      userId: {
        defaultValue: undefined,
      },
      displayName: {
        defaultValue: '',
      },
      turnOrder: {
        defaultValue: undefined,
      },
      money: {
        defaultValue: 0,
      },
      health: {
        defaultValue: 0,
      },
      isBot: {
        defaultValue: false,
      },
    };
  }
}
