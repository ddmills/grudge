import CardService from 'services/CardService';

export default class CardController {
  static async getPlayedCardsForUser({ userId }) {
    return CardService.getPlayedCardsForUser(userId);
  }
}
