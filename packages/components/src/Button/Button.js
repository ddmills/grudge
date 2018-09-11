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
    BtnComponent: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
    ]),
    className: PropTypes.string,
    to: PropTypes.string,
    isBlock: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isStyled: PropTypes.bool,
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
    isStyled: true,
    BtnComponent: 'button',
  }

  render() {
    const {
      color,
      size,
      isBlock,
      isStyled,
      isDisabled,
      className,
      BtnComponent,
      ...passProps
    } = this.props;

    const classes = classNames(
      {
        [styles.button]: isStyled,
        [styles[color]]: isStyled,
        [styles[size]]: isStyled,
        [styles.disabled]: isStyled && isDisabled,
        [styles.block]: isStyled && isBlock,
        [styles.blank]: !isStyled,
      },
      className,
    );

    return (
      <BtnComponent
        className={classes}
        disabled={isDisabled}
        {...passProps}
      >
        {this.props.children}
      </BtnComponent>
    );
  }
}
