import config from 'config';
import passport from 'passport';
import SteamStrategy from 'passport-steam';

const normalizeSteamUser = (identifier, userData, done) => {
  done({
    id: userData.id,
    displayName: userData.displayName,
    avatar: userData._json.avatar, // eslint-disable-line no-underscore-dangle
    name: userData._json.realname, // eslint-disable-line no-underscore-dangle
    steamUrl: userData._json.profileurl, // eslint-disable-line no-underscore-dangle
  });
};

export default function createMiddleware() {
  const url = `${config.server.protocol}://${config.server.host}:${config.server.port}`;
  const steamOptions = {
    returnURL: `${url}/auth/sign-in/return`,
    realm: url,
    apiKey: config.steam.key,
  };

  passport.use(new SteamStrategy(steamOptions, normalizeSteamUser));

  return passport.initialize();
}
