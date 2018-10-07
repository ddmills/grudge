import Precondition from './Precondition';

export default class TargetCardIsEnemyPrecondition extends Precondition {
  static id = 'pcd-target-card-is-enemy';

  static async validate(card, actionData) {
    if (!actionData.targetCard || card.userId === actionData.targetCard.userId) {
      throw new Error(`${actionData.id} requires an enemy target card`);
    }
  }
}
