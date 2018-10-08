import ActionService from 'services/ActionService';

export default class CardController {
  static async performAction({ user, action }) {
    return ActionService.performAction(user, action);
  }
}
