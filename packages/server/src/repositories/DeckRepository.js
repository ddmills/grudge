import ModelRepository from 'repositories/ModelRepository';
import { Deck } from '@grudge/domain';

export default class DeckRepository extends ModelRepository {
  static modelClass = Deck;

  static tableName = 'decks';

  static idPrefix = 'dek';

  static async getForUserInLobby(userId, lobbyId) {
    return this.first({ userId, lobbyId });
  }
}
