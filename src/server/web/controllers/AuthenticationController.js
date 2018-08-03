import Logger from 'utilities/Logger';
import * as AuthenticationService from 'services/AuthenticationService';

export function saveTarget(request, response, next) {
  request.session.targetUri = request.query.target;
  next();
}

export function associateUser(request, response, next) {
  AuthenticationService.associateUserWithOpenId(request.user)
    .then(next)
    .catch((error) => {
      Logger.error(error);
      response.status(400).send('yo');
    });
}

export function redirectToTarget(request, response) {
  const targetUri = request.session.targetUri || '/';
  const {
    provider,
    id,
  } = request.user;

  AuthenticationService.getUserWithOpenId(provider, id)
    .then((user) => {
      Logger.json(user);
      response.redirect(targetUri);
    }).catch((error) => {
      Logger.error(error);
      response.status(400).send('yo');
    });
}
