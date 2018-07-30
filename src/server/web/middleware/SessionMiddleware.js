import config from 'config';
import session from 'express-session';

export default function createMiddleware() {
  const options = config.session;

  return session(options);
}
