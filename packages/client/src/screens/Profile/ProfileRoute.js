import ProfileScreen from 'screens/Profile/ProfileScreen';
import ProfileStore from 'screens/Profile/ProfileStore';
import Route from 'screens/Route';

export default class ProfileRoute extends Route {
  name = 'profile';

  path = '/profile/:userId';

  isAuthRequired = true;

  Component = ProfileScreen;

  storeName = 'profileStore';

  static createStore({ userStore }) {
    return new ProfileStore(userStore);
  }

  static onActivated(profileStore, { userId }) {
    profileStore.getUser(userId);
  }
}
