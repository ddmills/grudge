import passport from 'passport';
import Logger from 'utilities/Logger';

export const authenticate = passport.authenticate('steam', {
  session: false,
});

export function saveTarget(request, response, next) {
  Logger.log('AuthController::saveTarget');

  request.session.targetUri = request.query.target;
  next();
}

export function redirectToTarget(request, response) {
  Logger.log('AuthController::redirectToTarget');

  const targetUri = request.session.targetUri || '/';

  Logger.json(request.user);

  response.redirect(targetUri);
}
