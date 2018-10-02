import { CardType } from '@grudge/domain';
import { CardTypes } from '@grudge/data';

export default class CardTypeRepository {
  static async list() {
    return Object.values(CardTypes).map((rawCardType) => CardType.create(rawCardType));
  }

  static async get(id) {
    const data = CardTypes[id];

    if (!data) {
      throw new Error(`CardType with id ${id} not found`);
    }

    return CardType.create(data);
  }
}
