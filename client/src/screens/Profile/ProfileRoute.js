import ProfileScreen from 'screens/Profile/ProfileScreen';

export default {
  name: 'profile',
  path: '/profile/:userId',
  isAuthRequired: true,
  Component: ProfileScreen,
};
