import LandingScreen from 'screens/Landing/LandingScreen';

export default {
  name: 'landing',
  path: '/?:greeting',
  isAuthRequired: false,
  Component: LandingScreen,
};
