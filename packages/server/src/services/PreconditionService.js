import Logger from 'utilities/Logger';
import Preconditions from 'actions/preconditions/index';

export default class PreconditionService {
  static get(preconditionId) {
    return Preconditions.find((precondition) => precondition.id === preconditionId);
  }

  static validate(context, preconditionParams, actionData) {
    const precondition = this.get(preconditionParams.id);

    if (!precondition) {
      Logger.warn(`Precondition ${preconditionParams.id} not found`);
    } else {
      precondition.validate(context, preconditionParams, actionData);
    }
  }

  static validateAll(context, allPreconditionParams, actionData) {
    allPreconditionParams.forEach((preconditionParams) => {
      return this.validate(context, preconditionParams, actionData);
    });
  }
}
