import Model from './Model';

export default class CardType extends Model {
  static get defaults() {
    return {
      id: undefined,
      name: 'Card',
      description: 'Card description',
      cost: 0,
      value: 0,
      attack: 0,
      defense: 0,
      points: 0,
    };
  }
}
