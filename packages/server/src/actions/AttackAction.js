import { ActionIds, EffectIds, PreconditionIds } from '@grudge/data';
import Action from './Action';

export default class AttackAction extends Action {
  static id = ActionIds.ATTACK;

  static preconditions = [
    { id: PreconditionIds.CARD_IS_ENABLED },
    { id: PreconditionIds.USER_CAN_AFFORD },
    { id: PreconditionIds.TARGET_CARD_IS_ENEMY },
    { id: PreconditionIds.TARGET_CARD_HAS_HEALTH },
  ]

  static effects = [
    { id: EffectIds.DAMAGE },
    { id: EffectIds.DISABLE },
  ]
}
