import Logger from 'utilities/Logger';
import TraitService from 'services/TraitService';
import Effect from './Effect';

export default class EnableEffect extends Effect {
  static id = 'efx-enable';

  static async apply(context, card) {
    Logger.info('efx-enable', card.id);
    return TraitService.removeTrait(card.id, 'trt-disabled');
  }
}
