import { ActionIds, EffectIds, PreconditionIds } from '@grudge/data';
import Action from './Action';

export default class PlayAction extends Action {
  static id = ActionIds.PLAY;

  static preconditions = [
    { id: PreconditionIds.CARD_IS_ENABLED },
    { id: PreconditionIds.USER_CAN_AFFORD },
  ]

  static effects = [
    { id: EffectIds.PLAY },
    { id: EffectIds.PAY },
  ]
}
