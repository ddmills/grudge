import Model from './Model';

export default class Card extends Model {
  static get defaults() {
    return {
      id: undefined,
      cardTypeId: undefined,
      deckId: undefined,
      createdAt: undefined,
      isDrawn: false,
      isDiscarded: false,
    };
  }
}
