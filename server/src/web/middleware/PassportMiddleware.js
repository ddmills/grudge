import passport from 'passport';
import SteamPassportStrategy from 'providers/steam/auth/SteamPassportStrategy';
import * as AuthService from 'services/AuthService';

passport.serializeUser((user, done) => done(undefined, user));
passport.deserializeUser((user, done) => done(undefined, user));
passport.use(SteamPassportStrategy(AuthService.associateUserWithOpenId));

export default function createMiddleware() {
  return passport.initialize();
}
