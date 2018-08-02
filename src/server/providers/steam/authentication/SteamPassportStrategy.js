import config from 'config';
import SteamStrategy from 'passport-steam';
import * as AuthenticationService from 'services/AuthenticationService';

const verify = (identityUrl, profile, done) => {
  AuthenticationService.findOrCreateUserWithOpenId(identityUrl, profile)
    .then((user) => done(null, user))
    .catch((error) => done(error));
};

const url = `${config.server.protocol}://${config.server.host}:${config.server.port}`;
const steamOptions = {
  returnURL: `${url}/sign-in/return`,
  realm: url,
  apiKey: config.steam.key,
};

export default function createStrategy() {
  return new SteamStrategy(steamOptions, verify);
}
