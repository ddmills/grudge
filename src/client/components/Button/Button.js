import { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Link from 'components/Link/Link';
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
    to: PropTypes.string,
    isBlock: PropTypes.bool,
    isDisabled: PropTypes.bool,
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
    to: undefined,
    className: undefined,
    size: 'md',
    color: 'default',
    type: 'button',
    isBlock: false,
    isDisabled: false,
  }

  render() {
    const {
      to,
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

    const BtnComponent = to ? Link : 'button';

    return (
      <BtnComponent
        className={classes}
        disabled={isDisabled}
        to={to}
        {...passProps}
      >
        {this.props.children}
      </BtnComponent>
    );
  }
}
