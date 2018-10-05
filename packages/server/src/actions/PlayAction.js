import { ActionIds } from '@grudge/data';
import Logger from 'utilities/Logger';
import CardService from 'services/CardService';
import Action from './Action';

export default class PlayAction extends Action {
  static id = ActionIds.PLAY;

  static async perform(user, actionData, cardId) {
    await CardService.playCard(user, cardId);

    Logger.debug(`${user.id} perform ${actionData.id} on ${cardId}`);
  }
}
