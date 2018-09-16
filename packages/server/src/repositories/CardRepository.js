import ModelRepository from 'repositories/ModelRepository';
import { Card } from '@grudge/domain';

export default class CardRepository extends ModelRepository {
  static modelClass = Card;

  static tableName = 'cards';

  static idPrefix = 'crd';

  static async findForDeck(deckId) {
    return this.where({ deckId });
  }
}
