import SignInRoute from './SignIn/SignInRoute';
import SignOutRoute from './SignOut/SignOutRoute';
import LandingRoute from './Landing/LandingRoute';
import ProfileRoute from './Profile/ProfileRoute';

const authSteam = {
  name: 'auth-steam',
  path: '/sign-in/steam?:target',
  isExternal: true,
};

export default {
  [SignInRoute.name]: SignInRoute,
  [SignOutRoute.name]: SignOutRoute,
  [LandingRoute.name]: LandingRoute,
  [ProfileRoute.name]: ProfileRoute,
  [authSteam.name]: authSteam,
};
