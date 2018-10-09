import ModelRepository from 'repositories/ModelRepository';
import { Card } from '@grudge/domain';

export default class CardRepository extends ModelRepository {
  static modelClass = Card;

  static tableName = 'cards';

  static idPrefix = 'crd';

  static async findForDeck(deckId) {
    return this.where({ deckId });
  }

  static async findForUser(userId, lobbyId) {
    return this.where({ userId, lobbyId });
  }

  static async createForCardType(cardType, properties) {
    return this.create({
      cardTypeId: cardType.id,
      traits: cardType.traits,
      onPlayed: cardType.onPlayed,
      onDrawn: cardType.onDrawn,
      onDestroyed: cardType.onDestroyed,
      playActions: cardType.playActions,
      handActions: cardType.handActions,
      ...properties,
    });
  }
}
