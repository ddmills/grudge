import CardService from 'services/CardService';

export default class CardController {
  static async playCard({ user, cardId }) {
    return CardService.playCard(user, cardId);
  }
}
