import TraitService from 'services/TraitService';
import Effect from './Effect';

export default class EnableEffect extends Effect {
  static id = 'efx-enable';

  static async apply(context, card) {
    return TraitService.removeTrait(card.id, 'trt-disabled');
  }
}
