import { Component } from 'react';
import styles from './LoadingIndicator.scss';

export default class LoadingIndicator extends Component {
  render() {
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
