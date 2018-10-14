import { EffectIds, TraitIds } from '@grudge/data';
import HealthService from 'services/HealthService';
import Effect from './Effect';

export default class DamagePlayerEffect extends Effect {
  static id = EffectIds.DAMAGE_PLAYER;

  static async apply(effectParams, { card, targetUser }) {
    const damage = card.getTrait(TraitIds.ATTACK).value;
    const remaining = targetUser.health - damage;
    const value = remaining <= 0 ? 0 : remaining;

    return HealthService.set(targetUser.id, value);
  }
}
