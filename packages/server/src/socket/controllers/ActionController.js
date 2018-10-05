import ActionService from 'services/ActionService';

export default class CardController {
  static async performAction({ user, action, cardId }) {
    return ActionService.performAction(user, action, cardId);
  }
}
