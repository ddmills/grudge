import Logger from 'utilities/Logger';
import Preconditions from 'actions/preconditions/index';

export default class PreconditionService {
  static get(preconditionId) {
    return Preconditions.find((precondition) => precondition.id === preconditionId);
  }

  static async validate(preconditionParams, actionData) {
    const precondition = this.get(preconditionParams.id);

    if (!precondition) {
      Logger.warn(`Precondition ${preconditionParams.id} not found`);
    } else {
      await precondition.validate(preconditionParams, actionData);
    }
  }

  static async validateAll(allPreconditionParams, actionData) {
    await Promise.all(allPreconditionParams.map((preconditionParams) => {
      return this.validate(preconditionParams, actionData);
    }));
  }
}
