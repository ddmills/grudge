import { Component } from 'react';
import PropTypes from 'prop-types';
import connect from 'utilities/mobx/Connect';
import Redirect from 'components/Redirect/Redirect';
import Route from 'screens/Route';

@connect(({ authStore, routerStore }) => ({
  isAuthenticated: authStore.isAuthenticated,
  deauthenticate: authStore.deauthenticate,
  previousRoute: routerStore.previous,
  previousParams: routerStore.previousParams,
}))
export default class SignInScreen extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    deauthenticate: PropTypes.func.isRequired,
    previousRoute: PropTypes.instanceOf(Route),
    previousParams: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  };

  static defaultProps = {
    previousRoute: null,
    previousParams: null,
  }

  componentDidMount() {
    this.props.deauthenticate();
  }

  render() {
    const {
      isAuthenticated,
      previousRoute,
      previousParams,
    } = this.props;

    if (!isAuthenticated) {
      if (!previousRoute || previousRoute.isAuthRequired) {
        return <Redirect to="landing"/>;
      }

      return (
        <Redirect
          to={previousRoute.name}
          params={previousParams}
        />
      );
    }

    return null;
  }
}
