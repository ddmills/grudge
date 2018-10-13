import { Component } from 'react';
import PropTypes from 'prop-types';
import ClickNHold from 'react-click-n-hold';
import classnames from 'classnames';
import autobind from 'autobind-decorator';
import styles from './CardContainer.scss';

@autobind
export default class CardContainer extends Component {
  static propTypes = {
    clickHoldDuration: PropTypes.number,
    onClick: PropTypes.func,
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
    clickHoldDuration: 0.24,
    onClick: () => {},
    onClickHold: () => {},
    size: 'md',
  }

  state = {
    isClickHold: false,
  }

  onClickStart(e) {
    this.setState({
      isClickHold: false,
    });
  }

  onClickEnd(e) {
    e.preventDefault();
    if (!this.state.isClickHold) {
      this.props.onClick();
    }
  }

  onClickHold() {
    this.setState({
      isClickHold: true,
    });

    this.props.onClickHold();
  }

  render() {
    const {
      children,
      clickHoldDuration,
      size,
    } = this.props;

    const classes = classnames(
      styles.cardContainer,
      styles[size],
    );

    return (
      <ClickNHold
        time={clickHoldDuration}
        onStart={this.onClickStart}
        onEnd={this.onClickEnd}
        onClickNHold={this.onClickHold}
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
