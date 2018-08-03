import passport from 'passport';

export const authenticate = passport.authenticate('steam', {
  session: false,
});
