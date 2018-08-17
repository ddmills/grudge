import SignInScreen from 'screens/SignIn/SignInScreen';

export default {
  name: 'sign-in',
  path: '/sign-in?:target',
  isAuthRequired: false,
  Component: SignInScreen,
};
