import DeckService from 'services/DeckService';

export default class DeckController {
  static async getHand({ user }) {
    return DeckService.getHand(user);
  }
}
