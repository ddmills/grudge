import config from 'config';
import SteamStrategy from 'passport-steam';
import Logger from 'utilities/Logger';

const verify = (associateUser) => (identityUrl, profile, done) => {
  associateUser({
    id: profile.id,
    identityUrl,
    provider: 'steam',
    displayName: profile.displayName,
    name: profile._json.realname, // eslint-disable-line no-underscore-dangle
    avatar: profile._json.avatar, // eslint-disable-line no-underscore-dangle
  }).then((user) => {
    done(null, user);
  }).catch((error) => {
    done(error);
  });
};

const protocol = config.get('server.protocol');
const host = config.get('server.host');
const port = config.get('server.port');
const isDev = config.get('env') === 'development';
const base = `${protocol}://${host}`;
const url = isDev ? `${base}:${port}` : base;

Logger.debug('Steam return URL', config.get('env'), url);

const steamOptions = {
  returnURL: `${url}/sign-in/steam/return`,
  realm: url,
  apiKey: config.steam.key,
};

export default function createStrategy(associateUser) {
  return new SteamStrategy(steamOptions, verify(associateUser));
}
