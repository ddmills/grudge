import TraitService from 'services/TraitService';
import Effect from './Effect';

export default class DisableEffect extends Effect {
  static id = 'efx-disable';

  static async apply(context, card) {
    return TraitService.addTrait(card.id, {
      id: 'trt-disabled',
    });
  }
}
