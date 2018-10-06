import { ActionIds, EffectIds } from '@grudge/data';
import CardIsEnabledPrecondition from './preconditions/CardIsEnabledPrecondition';
import Action from './Action';

export default class PlayAction extends Action {
  static id = ActionIds.PLAY;

  static preconditions = [
    CardIsEnabledPrecondition,
  ]

  static effects = [{
    id: EffectIds.PLAY,
  }]
}
