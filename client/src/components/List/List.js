import { Component } from 'react';
import styles from './List.scss';

export default class List extends Component {
  render() {
    return (
      <ul className={styles.list}>
        {this.props.children}
      </ul>
    );
  }
}
