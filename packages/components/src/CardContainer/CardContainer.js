import { Component } from 'react';
import PropTypes from 'prop-types';
import ResizeDetector from 'react-resize-detector';
import ClickNHold from 'react-click-n-hold';
import autobind from 'autobind-decorator';
import styles from './CardContainer.scss';

@autobind
export default class CardContainer extends Component {
  static propTypes = {
    clickHoldDuration: PropTypes.number,
    onClickStart: PropTypes.func,
    onClickEnd: PropTypes.func,
    onClickHold: PropTypes.func,
  }

  static defaultProps = {
    clickHoldDuration: 1,
    onClickStart: () => {},
    onClickEnd: () => {},
    onClickHold: () => {},
  }

  static computeStyle(height = 1) {
    return {
      width: height / 1.4,
      height,
    };
  }

  static computeZoomStyle(height = 1) {
    return {
      zoom: height / 140,
    };
  }

  render() {
    const {
      children,
      clickHoldDuration,
      onClickStart,
      onClickEnd,
      onClickHold,
    } = this.props;

    return (
      <ResizeDetector
        handleHeight
        render={({ height }) => (
          <ClickNHold
            time={clickHoldDuration}
            onStart={onClickStart}
            onEnd={onClickEnd}
            onClickNHold={onClickHold}
          >
            <div className={styles.cardContainer} style={CardContainer.computeStyle(height)}>
              <div
                className={styles.cardContainerContent}
                style={CardContainer.computeZoomStyle(height)}
              >
                {children}
              </div>
            </div>
          </ClickNHold>
        )}
      />
    );
  }
}
