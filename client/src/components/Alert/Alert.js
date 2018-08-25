import { Component } from 'react';
import styles from './Alert.scss';

export default class Alert extends Component {
  render() {
    return (
      <div className={styles.alert}>
        {this.props.children}
      </div>
    );
  }
}
