import SignInScreen from 'screens/SignIn/SignInScreen';
import Route from 'screens/Route';

export default class SignInRoute extends Route {
  name = 'sign-in';

  path = '/sign-in?:target';

  isAuthRequired = false;

  Component = SignInScreen;
}
