import { ActionIds, EffectIds } from '@grudge/data';
import CardHasValuePrecondition from './preconditions/CardHasValuePrecondition';
import CardIsEnabledPrecondition from './preconditions/CardIsEnabledPrecondition';
import Action from './Action';

export default class CollectAction extends Action {
  static id = ActionIds.COLLECT;

  static preconditions = [
    CardIsEnabledPrecondition,
    CardHasValuePrecondition,
  ]

  static effects = [{
    id: EffectIds.COLLECT,
  }]
}
