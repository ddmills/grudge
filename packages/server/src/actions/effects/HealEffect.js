import TraitService from 'services/TraitService';
import { EffectIds, TraitIds } from '@grudge/data';
import Effect from './Effect';

export default class HealEffect extends Effect {
  static id = EffectIds.HEAL;

  static async apply(effectParams, { card, targetCard }) {
    const heal = card.getTrait(TraitIds.HEAL).value;
    const health = targetCard.getTrait(TraitIds.HEALTH);
    const remaining = health.value + heal;
    const value = remaining >= health.max ? health.max : remaining;

    await TraitService.addTrait(targetCard.id, {
      id: TraitIds.HEALTH,
      max: health.max,
      value,
    });
  }
}
