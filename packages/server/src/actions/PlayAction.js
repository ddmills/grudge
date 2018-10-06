import { ActionIds, EffectIds } from '@grudge/data';
import CardIsEnabledPrecondition from './preconditions/CardIsEnabledPrecondition';
import UserCanAffordPrecondition from './preconditions/UserCanAffordPrecondition';
import Action from './Action';

export default class PlayAction extends Action {
  static id = ActionIds.PLAY;

  static preconditions = [
    CardIsEnabledPrecondition,
    UserCanAffordPrecondition,
  ]

  static effects = [
    {
      id: EffectIds.PLAY,
    },
    {
      id: EffectIds.PAY,
    },
  ]
}
