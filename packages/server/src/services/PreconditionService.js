import Logger from 'utilities/Logger';
import Preconditions from 'actions/preconditions/index';

export default class PreconditionService {
  static get(preconditionId) {
    return Preconditions.find((precondition) => precondition.id === preconditionId);
  }

  static validate(ctx, preconditionParams, actionData) {
    const precondition = this.get(preconditionParams.id);

    if (!precondition) {
      Logger.warn(`Precondition ${preconditionParams.id} not found`);
    } else {
      Logger.debug(`Validating precondition ${precondition.id}`);
      precondition.validate(ctx, preconditionParams, actionData);
    }
  }

  static validateAll(ctx, allPreconditionParams, actionData) {
    allPreconditionParams.forEach((preconditionParams) => {
      return this.validate(ctx, preconditionParams, actionData);
    });
  }
}
