import config from 'config';
import passport from 'passport';
import SteamStrategy from 'passport-steam';
import * as AuthorizationService from 'services/AuthorizationService';

const verify = (identityUrl, profile, done) => {
  AuthorizationService.findOrCreateUserWithOpenId(identityUrl, profile)
    .then((user) => done(null, user))
    .catch((error) => done(error));
};

const url = `${config.server.protocol}://${config.server.host}:${config.server.port}`;
const steamOptions = {
  returnURL: `${url}/sign-in/return`,
  realm: url,
  apiKey: config.steam.key,
};

passport.serializeUser((user, done) => done(undefined, user));
passport.deserializeUser((user, done) => done(undefined, user));
passport.use(new SteamStrategy(steamOptions, verify));

export default function createMiddleware() {
  return passport.initialize();
}
