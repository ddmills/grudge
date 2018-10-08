import {
  ActionIds, TraitIds, EffectIds, PreconditionIds,
} from '@grudge/data';
import Action from './Action';

export default class CollectAction extends Action {
  static id = ActionIds.COLLECT;

  static preconditions = [
    { id: PreconditionIds.CARD_IS_ENABLED },
    { id: PreconditionIds.CARD_HAS_VALUE },
  ]

  static effects = [
    { id: EffectIds.COLLECT },
    {
      id: EffectIds.ADD_TRAIT,
      traitId: TraitIds.DISABLED,
    },
  ]
}
