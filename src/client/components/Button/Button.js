import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Button.scss';

export default class Button extends Component {
  static propTypes = {
    type: PropTypes.oneOf([
      'button',
      'submit',
      'reset',
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
    color: 'default',
    type: 'button',
    isBlock: false,
    isDisabled: false,
    onClick: () => {},
  }

  render() {
    const {
      color,
      isBlock,
      isDisabled,
      className,
      ...passProps
    } = this.props;

    const classNames = [styles.button, styles[color]];

    if (className) {
      classNames.push(className);
    }

    if (isBlock) {
      classNames.push(styles.block);
    }

    if (isDisabled) {
      classNames.push(styles.disabled);
    }

    return (
      <button
        className={classNames.join(' ')}
        disabled={isDisabled}
        {...passProps}
      >
        {this.props.children}
      </button>
    );
  }
}
