import { EffectIds } from '@grudge/data';
import ActionRefService from 'services/ActionRefService';
import HealthService from 'services/HealthService';
import Effect from './Effect';

export default class DamagePlayerEffect extends Effect {
  static id = EffectIds.DAMAGE_PLAYER;

  static async apply({ value }, { card, targetUser }) {
    const damage = await ActionRefService.getRefValue(card, value);
    const difference = targetUser.health - damage;
    const remaining = difference <= 0 ? 0 : difference;

    return HealthService.set(targetUser.id, remaining);
  }
}
