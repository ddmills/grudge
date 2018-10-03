import TraitService from 'services/TraitService';
import { EffectIds, TraitIds } from '@grudge/data';
import Effect from './Effect';

export default class EnableEffect extends Effect {
  static id = EffectIds.ENABLE;

  static async apply(effect, card) {
    return TraitService.removeTrait(card.id, TraitIds.DISABLED);
  }
}
