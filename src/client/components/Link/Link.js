import { Component } from 'react';
import PropTypes from 'prop-types';
import connect from 'utilities/mobx/Connect';
import autobind from 'autobind-decorator';

@connect(({ routerStore }) => ({
  navigate: routerStore.navigate,
  buildUrl: routerStore.buildUrl,
}))
export default class Link extends Component {
  static propTypes = {
    navigate: PropTypes.func.isRequired,
    buildUrl: PropTypes.func.isRequired,
    to: PropTypes.string.isRequired,
    params: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  };

  static defaultProps = {
    params: {},
  };

  @autobind
  navigate(e) {
    e.preventDefault();
    const {
      to,
      params,
    } = this.props;

    this.props.navigate(to, params);

    return false;
  }

  render() {
    const {
      buildUrl,
      to,
      params,
      navigate,
      children,
      ...passProps
    } = this.props;

    return (
      <a href={buildUrl(to, params)} onClick={this.navigate} {...passProps}>
        {children}
      </a>
    );
  }
}
