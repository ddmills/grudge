import ActionRefService from 'services/ActionRefService';
import TraitService from 'services/TraitService';
import CardService from 'services/CardService';
import { EffectIds, TraitIds } from '@grudge/data';
import Effect from './Effect';

export default class DamageEffect extends Effect {
  static id = EffectIds.DAMAGE;

  static async apply({ value }, { card, targetCard }) {
    const targetHealthTrait = targetCard.getTrait(TraitIds.HEALTH);
    const damage = await ActionRefService.getRefValue(card, value);
    const health = await ActionRefService.getRefValue(targetCard, targetHealthTrait.value);
    const difference = health - damage;
    const remaining = difference <= 0 ? 0 : difference;

    const updatedCard = await TraitService.addTrait(targetCard.id, {
      id: TraitIds.HEALTH,
      max: targetHealthTrait.max,
      value: remaining,
    });

    if (remaining <= 0) {
      await CardService.killCard(updatedCard);
    }
  }
}
