import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './LoadingIndicator.scss';

export default class LoadingIndicator extends Component {
  static propTypes = {
    isVisible: PropTypes.bool,
  }

  static defaultProps = {
    isVisible: true,
  }

  render() {
    if (!this.props.isVisible) {
      return null;
    }

    return (
      <div className={styles.loadingContainer}>
        <span className={styles.loadingIndicator}/>
        <span className={styles.loadingText}>
          {this.props.children}
        </span>
      </div>
    );
  }
}
