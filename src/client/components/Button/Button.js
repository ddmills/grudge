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
      ...passProps
    } = this.props;

    const classNames = [styles.button, styles[color]];

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
