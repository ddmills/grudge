import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Container.scss';

export default class Container extends Component {
  static propTypes = {
    isResponsive: PropTypes.bool,
    size: PropTypes.oneOf([
      'sm',
      'md',
      'lg',
      'xl',
    ]),
  }

  static defaultProps = {
    isResponsive: true,
    size: 'md',
  }

  render() {
    const {
      isResponsive,
      size,
    } = this.props;
    const classNames = [styles.container, styles[size]];

    if (isResponsive) {
      classNames.push(styles.responsive);
    }

    return (
      <div className={classNames.join(' ')}>
        {this.props.children}
      </div>
    );
  }
}
