import { ActionIds, EffectIds } from '@grudge/data';
import CardIsEnabledPrecondition from './preconditions/CardIsEnabledPrecondition';
import UserCanAffordPrecondition from './preconditions/UserCanAffordPrecondition';
import TargetCardIsEnemyPrecondition from './preconditions/TargetCardIsEnemyPrecondition';
import TargetCardHasHealthPrecondition from './preconditions/TargetCardHasHealthPrecondition';
import Action from './Action';

export default class AttackAction extends Action {
  static id = ActionIds.ATTACK;

  static preconditions = [
    CardIsEnabledPrecondition,
    UserCanAffordPrecondition,
    TargetCardIsEnemyPrecondition,
    TargetCardHasHealthPrecondition,
  ]

  static effects = [
    {
      id: EffectIds.DAMAGE,
    },
    {
      id: EffectIds.DISABLE,
    },
  ]
}
