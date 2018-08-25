import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Alert.scss';

export default class Alert extends Component {
  static propTypes = {
    error: PropTypes.instanceOf(Error),
  };

  static defaultProps = {
    error: undefined,
  };

  render() {
    const {
      children,
      error,
    } = this.props;

    if (!children && !error) {
      return null;
    }

    return (
      <div className={styles.alert}>
        {this.props.children || this.props.error.toString()}
      </div>
    );
  }
}
