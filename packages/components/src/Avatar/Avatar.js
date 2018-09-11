import { Component } from 'react';
import PropTypes from 'prop-types';
import { User } from '@grudge/domain';
import classNames from 'classnames';
import styles from './Avatar.scss';

export default class Avatar extends Component {
  static propTypes = {
    user: PropTypes.instanceOf(User).isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: undefined,
  }

  render() {
    const {
      user,
      className,
    } = this.props;

    const classes = classNames(
      styles.avatar,
      className,
    );

    return (
      <img
        className={classes}
        src={user.avatar}
        alt={user.displayName}
        title={user.displayName}
      />
    );
  }
}
