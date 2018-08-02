import passport from 'passport';
import Logger from 'utilities/Logger';

export const authenticate = passport.authenticate('steam', {
  session: false,
});

export function saveTarget(request, response, next) {
  request.session.targetUri = request.query.target;
  next();
}

export function redirectToTarget(request, response) {
  const targetUri = request.session.targetUri || '/';

  Logger.json(request.user.properties);

  response.redirect(targetUri);
}
