import ActionService from 'services/ActionService';

export default class CardController {
  static async performAction({ user, context, action }) {
    return ActionService.performAction(user, context, action);
  }
}
