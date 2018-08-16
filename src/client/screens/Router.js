import { Component } from 'react';
import PropTypes from 'prop-types';
import connect from 'utilities/mobx/Connect';

@connect(({ routerStore }) => ({
  RouteComponent: routerStore.Component,
  params: routerStore.params,
}))
export default class Router extends Component {
  static propTypes = {
    RouteComponent: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  render() {
    const {
      RouteComponent,
      params,
    } = this.props;

    return <RouteComponent {...params}/>;
  }
}
