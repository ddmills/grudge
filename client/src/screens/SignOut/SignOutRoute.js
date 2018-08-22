import SignOutScreen from 'screens/SignOut/SignOutScreen';
import Route from 'screens/Route';

export default class SignOutRoute extends Route {
  name = 'sign-out';

  path = '/sign-out';

  isAuthRequired = false;

  Component = SignOutScreen;
}
