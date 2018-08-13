import { Component } from 'react';
import PropTypes from 'prop-types';
import connect from 'utilities/mobx/Connect';
import autobind from 'autobind-decorator';

@connect(({ routerStore }) => ({
  navigate: routerStore.navigate,
  buildPath: routerStore.buildPath,
}))
export default class Link extends Component {
  static propTypes = {
    navigate: PropTypes.func.isRequired,
    buildPath: PropTypes.func.isRequired,
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
    return (
      <a href={this.props.buildPath(this.props.to, this.props.params)} onClick={this.navigate}>
        {this.props.children}
      </a>
    );
  }
}
