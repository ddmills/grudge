import LandingScreen from 'screens/Landing/LandingScreen';
import Route from 'screens/Route';

export default class LandingRoute extends Route {
  name = 'landing';

  path = '/?:greeting';

  isAuthRequired = false;

  Component = LandingScreen;
}
