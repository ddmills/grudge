import * as AuthenticationService from 'services/AuthenticationService';

export function saveTarget(request, response, next) {
  request.session.targetUri = request.query.target;
  next();
}

export function createJWT(request, response, next) {
  const token = AuthenticationService.createTokenForUser(request.user);

  response.cookie('JWT', token, {
    httpOnly: true,
  });

  next();
}

export function redirectToTarget(request, response) {
  const targetUri = request.session.targetUri || '/';
  response.redirect(targetUri);
}
