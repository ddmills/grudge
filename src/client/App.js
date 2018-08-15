import { Component } from 'react';
import PropTypes from 'prop-types';
import connect from 'utilities/mobx/Connect';
import Redirect from 'components/Redirect/Redirect';

@connect(({ authStore, routerStore }) => ({
  RouteComponent: routerStore.current.Component,
  params: routerStore.params,
  route: routerStore.current,
  isAuthRequired: routerStore.current.isAuthRequired,
  isAuthenticated: authStore.isAuthenticated,
}))
export default class App extends Component {
  static propTypes = {
    RouteComponent: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    isAuthRequired: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
  };

  render() {
    const {
      RouteComponent,
      params,
      isAuthRequired,
      isAuthenticated,
    } = this.props;

    if (isAuthRequired && !isAuthenticated) {
      return <Redirect to={`/sign-in/steam?target=${encodeURIComponent('/?authenticated')}`}/>;
    }

    return <RouteComponent {...params}/>;
  }
}
