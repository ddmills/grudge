import config from 'config';
import passport from 'passport';
import SteamStrategy from 'passport-steam';

const normalizeSteamUser = (identifier, profile, done) => {
  done(null, {
    id: profile.id,
    displayName: profile.displayName,
    avatar: profile._json.avatar, // eslint-disable-line no-underscore-dangle
    name: profile._json.realname, // eslint-disable-line no-underscore-dangle
    steamUrl: profile._json.profileurl, // eslint-disable-line no-underscore-dangle
  });
};

const url = `${config.server.protocol}://${config.server.host}:${config.server.port}`;
const steamOptions = {
  returnURL: `${url}/sign-in/return`,
  realm: url,
  apiKey: config.steam.key,
};

passport.serializeUser((user, done) => done(undefined, user));
passport.deserializeUser((user, done) => done(undefined, user));
passport.use(new SteamStrategy(steamOptions, normalizeSteamUser));

export default function createMiddleware() {
  return passport.initialize();
}
