import TraitService from 'services/TraitService';
import { EffectIds } from '@grudge/data';
import Effect from './Effect';

export default class AddTraitEffect extends Effect {
  static id = EffectIds.ADD_TRAIT;

  static async apply(effect, card) {
    return TraitService.addTrait(card.id, {
      id: effect.traitId,
      ...effect.traitParams,
    });
  }
}
