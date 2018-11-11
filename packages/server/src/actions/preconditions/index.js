import CardHasTraitPrecondition from './CardHasTraitPrecondition';
import CardIsEnabledPrecondition from './CardIsEnabledPrecondition';
import TargetCardIsNotDefendedPrecondition from './TargetCardIsNotDefendedPrecondition';
import TargetCardIsEnemyPrecondition from './TargetCardIsEnemyPrecondition';
import TargetCardIsAllyPrecondition from './TargetCardIsAllyPrecondition';
import UserCanAffordPrecondition from './UserCanAffordPrecondition';
import TargetSlotIndexIsOpenPrecondition from './TargetSlotIndexIsOpenPrecondition';

export default [
  CardHasTraitPrecondition,
  CardIsEnabledPrecondition,
  TargetCardIsAllyPrecondition,
  TargetCardIsEnemyPrecondition,
  TargetCardIsNotDefendedPrecondition,
  TargetSlotIndexIsOpenPrecondition,
  UserCanAffordPrecondition,
];
