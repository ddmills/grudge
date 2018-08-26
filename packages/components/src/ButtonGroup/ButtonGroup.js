import React, { Component } from 'react';
import addPropsToChildren from '../utilities/AddPropsToChildren';
import styles from './ButtonGroup.scss';

export default class ButtonGroup extends Component {
  render() {
    return (
      <div className={styles.buttonGroup}>
        {
          addPropsToChildren(this.props.children, { className: styles.buttonGroupItem })
        }
      </div>
    );
  }
}
