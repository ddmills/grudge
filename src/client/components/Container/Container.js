import { Component } from 'react';
import styles from './Container.scss';

export default class Container extends Component {
  render() {
    return (
      <div className={[styles.container, styles.responsive].join(' ')}>
        {this.props.children}
      </div>
    );
  }
}
