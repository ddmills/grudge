import TraitService from 'services/TraitService';
import { EffectIds, TraitIds } from '@grudge/data';
import Effect from './Effect';

export default class DisableEffect extends Effect {
  static id = EffectIds.DISABLE;

  static async apply(effect, card) {
    return TraitService.addTrait(card.id, {
      id: TraitIds.DISABLED,
    });
  }
}
