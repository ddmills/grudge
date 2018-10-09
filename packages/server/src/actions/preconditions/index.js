import CardHasValuePrecondition from './CardHasValuePrecondition';
import CardIsEnabledPrecondition from './CardIsEnabledPrecondition';
import TargetCardHasHealthPrecondition from './TargetCardHasHealthPrecondition';
import TargetCardIsEnemyPrecondition from './TargetCardIsEnemyPrecondition';
import UserCanAffordPrecondition from './UserCanAffordPrecondition';
import TargetSlotIndexIsOpenPrecondition from './TargetSlotIndexIsOpenPrecondition';

export default [
  CardHasValuePrecondition,
  CardIsEnabledPrecondition,
  TargetCardHasHealthPrecondition,
  TargetCardIsEnemyPrecondition,
  UserCanAffordPrecondition,
  TargetSlotIndexIsOpenPrecondition,
];
