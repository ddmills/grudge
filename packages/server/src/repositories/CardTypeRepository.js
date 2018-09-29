import { CardType } from '@grudge/domain';
import { CardTypes } from '@grudge/data';

export default class CardTypeRepository {
  static async list() {
    return CardTypes.map((rawCardType) => CardType.create(rawCardType));
  }

  static async get(id) {
    const data = CardTypes.find((rawCardType) => rawCardType.id === id);

    if (!data) {
      throw new Error(`CardType with id ${id} not found`);
    }

    return CardType.create(data);
  }
}
