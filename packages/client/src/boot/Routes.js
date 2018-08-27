import Route from 'screens/Route';
import SignInRoute from 'screens/SignIn/SignInRoute';
import SignOutRoute from 'screens/SignOut/SignOutRoute';
import LandingRoute from 'screens/Landing/LandingRoute';
import ProfileRoute from 'screens/Profile/ProfileRoute';
import LobbyListRoute from 'screens/LobbyList/LobbyListRoute';
import LobbyRoute from 'screens/Lobby/LobbyRoute';

class AuthSteamRoute extends Route {
  name = 'auth-steam';

  path = '/sign-in/steam?:target';

  isExternal = true;
}

export default (stores) => ([
  new SignInRoute(stores),
  new SignOutRoute(stores),
  new LandingRoute(stores),
  new ProfileRoute(stores),
  new AuthSteamRoute(stores),
  new LobbyListRoute(stores),
  new LobbyRoute(stores),
]);
