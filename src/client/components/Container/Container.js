import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Container.scss';

export default class Container extends Component {
  static propTypes = {
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
    isPadded: true,
    isResponsive: true,
    size: 'md',
  }

  render() {
    const {
      isPadded,
      isResponsive,
      size,
    } = this.props;
    const classNames = [styles.container, styles[size]];

    if (isResponsive) {
      classNames.push(styles.responsive);
    }

    if (isPadded) {
      classNames.push(styles.padded);
    }

    return (
      <div className={classNames.join(' ')}>
        {this.props.children}
      </div>
    );
  }
}
