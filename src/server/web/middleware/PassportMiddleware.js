import passport from 'passport';
import SteamPassportStrategy from 'providers/steam/authentication/SteamPassportStrategy';

passport.serializeUser((user, done) => done(undefined, user));
passport.deserializeUser((user, done) => done(undefined, user));
passport.use(SteamPassportStrategy());

export default function createMiddleware() {
  return passport.initialize();
}
