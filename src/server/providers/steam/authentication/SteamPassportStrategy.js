import config from 'config';
import SteamStrategy from 'passport-steam';

const verify = (identityUrl, profile, done) => {
  done(null, {
    id: profile.id,
    identityUrl,
    provider: 'steam',
    displayName: profile.displayName,
    name: profile._json.realname, // eslint-disable-line no-underscore-dangle
    avatar: profile._json.avatar, // eslint-disable-line no-underscore-dangle
  });
};

const url = `${config.server.protocol}://${config.server.host}:${config.server.port}`;
const steamOptions = {
  returnURL: `${url}/sign-in/steam/return`,
  realm: url,
  apiKey: config.steam.key,
};

export default function createStrategy() {
  return new SteamStrategy(steamOptions, verify);
}
