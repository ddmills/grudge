import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Avatar.scss';

export default class Avatar extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  render() {
    const {
      user,
    } = this.props;

    return (
      <img
        className={styles.avatar}
        src={user.avatar}
        alt={user.displayName}
        title={user.displayName}
      />
    );
  }
}
