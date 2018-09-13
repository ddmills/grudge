import LibraryScreen from 'screens/Library/LibraryScreen';
import Route from 'screens/Route';

export default class LibraryRoute extends Route {
  name = 'library';

  path = '/library';

  isAuthRequired = true;

  Component = LibraryScreen;
}
