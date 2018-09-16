import { CardType } from '@grudge/domain';

const rawCardTypes = [
  {
    id: 'hovel',
    name: 'Hovel',
    cost: 6,
    value: 1,
    defense: 3,
    points: 0,
  },
  {
    id: 'clay-mine',
    name: 'Clay Mine',
    cost: 6,
    value: 4,
    defense: 2,
    points: 0,
  },
  {
    id: 'tax-collector',
    name: 'Tax Collector',
    cost: 0,
    value: 2,
    attack: 0,
  },
  {
    id: 'tavern',
    name: 'Tavern',
    cost: 1,
    value: 1,
    defense: 2,
    points: 0,
  },
  {
    id: 'cathedral',
    name: 'Cathedral',
    cost: 16,
    value: 8,
    defense: 0,
    points: 8,
  },
  {
    id: 'necromancer',
    name: 'Necromancer',
    cost: 12,
    value: 0,
    defense: 2,
    points: 8,
    attack: 4,
  },
  {
    id: 'monk',
    name: 'Monk',
    cost: 0,
    value: 1,
    attack: 1,
    defense: 0,
    points: 0,
  },
  {
    id: 'courtines',
    name: 'Courtines',
    cost: 6,
    value: 0,
    attack: 0,
    defense: 4,
    points: 0,
  },
  {
    id: 'bannerman',
    name: 'Bannerman',
    cost: 3,
    value: 0,
    attack: 4,
    defense: 4,
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
  {
    id: 'graveyard',
    name: 'Graveyard',
    cost: 3,
    value: 0,
    attack: 0,
    points: 2,
  },
  {
    id: 'library',
    name: 'Library',
    cost: 3,
    value: 0,
    attack: 0,
    points: 2,
  },
  {
    id: 'watchtower',
    name: 'Watchtower',
    cost: 6,
    value: 0,
    attack: 4,
    defense: 8,
    points: 0,
  },
  {
    id: 'nunnery',
    name: 'Nunnery',
    cost: 5,
    value: 0,
    attack: 0,
    points: 5,
    defense: 5,
  },
  {
    id: 'barracks',
    name: 'Barracks',
    cost: 8,
    value: 0,
    attack: 4,
    points: 0,
    defense: 5,
  },
  {
    id: 'palace',
    name: 'Palace',
    cost: 20,
    value: 12,
    attack: 0,
    defense: 2,
    points: 10,
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
