import { Component } from 'react';
import PropTypes from 'prop-types';
import connect from 'utilities/mobx/Connect';

@connect(({ routerStore }) => ({
  navigate: routerStore.navigate,
  buildUrl: routerStore.buildUrl,
}))
export default class Redirect extends Component {
  static propTypes = {
    navigate: PropTypes.func.isRequired,
    to: PropTypes.string.isRequired,
    params: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  };

  static defaultProps = {
    params: {},
  };

  componentWillMount() {
    const {
      to,
      params,
      navigate,
    } = this.props;

    navigate(to, params);
  }

  render() {
    return null;
  }
}
