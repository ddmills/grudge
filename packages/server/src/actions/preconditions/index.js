import CardHasValuePrecondition from './CardHasValuePrecondition';
import CardIsEnabledPrecondition from './CardIsEnabledPrecondition';
import TargetCardIsNotDefendedPrecondition from './TargetCardIsNotDefendedPrecondition';
import TargetCardHasHealthPrecondition from './TargetCardHasHealthPrecondition';
import TargetCardIsEnemyPrecondition from './TargetCardIsEnemyPrecondition';
import TargetCardIsAllyPrecondition from './TargetCardIsAllyPrecondition';
import UserCanAffordPrecondition from './UserCanAffordPrecondition';
import TargetSlotIndexIsOpenPrecondition from './TargetSlotIndexIsOpenPrecondition';

export default [
  CardHasValuePrecondition,
  CardIsEnabledPrecondition,
  TargetCardIsAllyPrecondition,
  TargetCardIsEnemyPrecondition,
  TargetCardHasHealthPrecondition,
  TargetCardIsNotDefendedPrecondition,
  TargetSlotIndexIsOpenPrecondition,
  UserCanAffordPrecondition,
];
