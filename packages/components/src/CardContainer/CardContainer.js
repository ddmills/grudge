import { Component } from 'react';
import PropTypes from 'prop-types';
import ClickNHold from 'react-click-n-hold';
import classnames from 'classnames';
import styles from './CardContainer.scss';

export default class CardContainer extends Component {
  static propTypes = {
    clickHoldDuration: PropTypes.number,
    onClickStart: PropTypes.func,
    onClickEnd: PropTypes.func,
    onClickHold: PropTypes.func,
    size: PropTypes.oneOf([
      'xs',
      'sm',
      'md',
      'lg',
      'xl',
    ]),
  }

  static defaultProps = {
    clickHoldDuration: 1,
    onClickStart: () => {},
    onClickEnd: () => {},
    onClickHold: () => {},
    size: 'sm',
  }

  render() {
    const {
      children,
      clickHoldDuration,
      onClickStart,
      onClickEnd,
      onClickHold,
      size,
    } = this.props;

    const classes = classnames(
      styles.cardContainer,
      styles[size],
    );

    return (
      <ClickNHold
        time={clickHoldDuration}
        onStart={onClickStart}
        onEnd={onClickEnd}
        onClickNHold={onClickHold}
      >
        <div className={classes}>
          <div className={styles.cardContainerContent}>
            {children}
          </div>
        </div>
      </ClickNHold>
    );
  }
}
