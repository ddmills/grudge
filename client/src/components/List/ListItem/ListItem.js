import { Component } from 'react';
import styles from './ListItem.scss';

export default class ListItem extends Component {
  render() {
    const {
      children,
      ...passProps
    } = this.props;

    return (
      <li className={styles.listItem} {...passProps}>
        {children}
      </li>
    );
  }
}
