import passport from 'passport';
import SteamPassportStrategy from 'providers/steam/authentication/SteamPassportStrategy';
import * as AuthenticationService from 'services/AuthenticationService';

passport.serializeUser((user, done) => done(undefined, user));
passport.deserializeUser((user, done) => done(undefined, user));
passport.use(SteamPassportStrategy(AuthenticationService.associateUserWithOpenId));

export default function createMiddleware() {
  return passport.initialize();
}
