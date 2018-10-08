import TraitService from 'services/TraitService';
import { EffectIds } from '@grudge/data';
import Effect from './Effect';

export default class AddTraitEffect extends Effect {
  static id = EffectIds.ADD_TRAIT;

  static async apply(effectParams, { card }) {
    return TraitService.addTrait(card.id, {
      id: effectParams.traitId,
      ...effectParams.traitParams,
    });
  }
}
