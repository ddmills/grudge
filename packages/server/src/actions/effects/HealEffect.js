import ActionRefService from 'services/ActionRefService';
import TraitService from 'services/TraitService';
import { EffectIds, TraitIds } from '@grudge/data';
import Effect from './Effect';

export default class HealEffect extends Effect {
  static id = EffectIds.HEAL;

  static async apply({ value }, { card, targetCard }) {
    const targetHealthTrait = targetCard.getTrait(TraitIds.HEALTH);
    const heal = await ActionRefService.getRefValue(card, value);
    const health = await ActionRefService.getRefValue(targetCard, targetHealthTrait.value);
    const max = await ActionRefService.getRefValue(targetCard, targetHealthTrait.max);
    const difference = health + heal;
    const remaining = difference >= max ? max : difference;

    await TraitService.addTrait(targetCard.id, {
      id: TraitIds.HEALTH,
      max: targetHealthTrait.max,
      value: remaining,
    });
  }
}
