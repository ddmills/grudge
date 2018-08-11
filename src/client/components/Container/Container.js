import { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Container.scss';

export default class Container extends Component {
  static propTypes = {
    className: PropTypes.string,
    isPadded: PropTypes.bool,
    isResponsive: PropTypes.bool,
    size: PropTypes.oneOf([
      'sm',
      'md',
      'lg',
      'xl',
      'max',
    ]),
  }

  static defaultProps = {
    className: undefined,
    isPadded: true,
    isResponsive: true,
    size: 'md',
  }

  render() {
    const {
      className,
      isPadded,
      isResponsive,
      size,
    } = this.props;

    const classes = classNames(
      styles.container,
      styles[size],
      className,
      {
        [styles.responsive]: isResponsive,
        [styles.padded]: isPadded,
      },
    );

    return (
      <div className={classes}>
        {this.props.children}
      </div>
    );
  }
}
