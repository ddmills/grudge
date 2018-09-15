import { CardType } from '@grudge/domain';

const rawCardTypes = [
  {
    id: 'hovel',
    name: 'Hovel',
    cost: 6,
    value: 1,
    defense: 3,
    points: 1,
  },
  {
    id: 'clay-mine',
    name: 'Clay Mine',
    cost: 6,
    value: 4,
    defense: 2,
    points: 1,
  },
  {
    id: 'tax-collector',
    name: 'Tax Collector',
    cost: 0,
    value: 1,
    attack: 0,
  },
  {
    id: 'wishing-well',
    name: 'Wishing Well',
    cost: 1,
    value: 1,
    defense: 2,
    points: 0,
  },
  {
    id: 'monk',
    name: 'Monk',
    cost: 0,
    value: 0,
    attack: 1,
    defense: 1,
    points: 0,
  },
  {
    id: 'thief',
    name: 'Thief',
    cost: 0,
    value: 0,
    attack: 1,
    points: 0,
  },
];

export default class CardTypeRepository {
  static async list() {
    return rawCardTypes.map((rawCardType) => CardType.create(rawCardType));
  }

  static async get(id) {
    const data = rawCardTypes.find((rawCardType) => rawCardType.id === id);

    if (!data) {
      throw new Error(`CardType with id ${id} not found`);
    }

    return CardType.create(data);
  }
}
