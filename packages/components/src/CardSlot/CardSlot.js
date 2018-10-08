import { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './CardSlot.scss';

export default class Avatar extends Component {
  static propTypes = {
    className: PropTypes.string,
  };

  static defaultProps = {
    className: undefined,
  }

  render() {
    const {
      className,
      children,
    } = this.props;

    const classes = classNames(
      styles.slot,
      className,
    );

    return (
      <div className={classes}>
        {children}
      </div>
    );
  }
}
