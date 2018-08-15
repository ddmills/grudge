import { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Button.scss';

export default class Button extends Component {
  static propTypes = {
    type: PropTypes.oneOf([
      'button',
      'submit',
      'reset',
    ]),
    size: PropTypes.oneOf([
      'sm',
      'md',
      'lg',
    ]),
    className: PropTypes.string,
    isBlock: PropTypes.bool,
    isDisabled: PropTypes.bool,
    onClick: PropTypes.func,
    color: PropTypes.oneOf([
      'default',
      'primary',
      'red',
      'green',
      'blue',
      'purple',
    ]),
  }

  static defaultProps = {
    className: undefined,
    size: 'md',
    color: 'default',
    type: 'button',
    isBlock: false,
    isDisabled: false,
    onClick: () => {},
  }

  render() {
    const {
      color,
      size,
      isBlock,
      isDisabled,
      className,
      ...passProps
    } = this.props;

    const classes = classNames(
      styles.button,
      styles[color],
      styles[size],
      className,
      {
        [styles.disabled]: isDisabled,
        [styles.block]: isBlock,
      },
    );

    return (
      <button
        className={classes}
        disabled={isDisabled}
        {...passProps}
      >
        {this.props.children}
      </button>
    );
  }
}
