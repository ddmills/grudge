import Model from './Model';

export default class CardType extends Model {
  static get defaults() {
    return {
      id: undefined,
      name: 'Card',
      description: 'Card description',
      traits: [],
      onPlayed: [],
      onDrawn: [],
      onDestroyed: [],
      playActions: [],
      handActions: [],
    };
  }

  hasTrait(traitId) {
    return Boolean(this.getTrait(traitId));
  }

  getTrait(traitId) {
    return this.traits.find((trait) => trait.id === traitId);
  }
}
