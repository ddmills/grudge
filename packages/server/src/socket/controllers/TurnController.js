import TurnService from 'services/TurnService';

export default class TurnController {
  static async endTurn({ user }) {
    return TurnService.endTurn(user);
  }
}
