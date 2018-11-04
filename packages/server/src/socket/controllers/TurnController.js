import TurnService from 'services/TurnService';

export default class TurnController {
  static async endTurn({ user, context }) {
    return TurnService.endTurn(user, context);
  }
}
