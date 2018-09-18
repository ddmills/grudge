import { Component } from 'react';
import PropTypes from 'prop-types';
import ResizeDetector from 'react-resize-detector';
import ClickNHold from 'react-click-n-hold';
import classNames from 'classnames';
import autobind from 'autobind-decorator';
import styles from './CardContainer.scss';

@autobind
export default class CardContainer extends Component {
  static propTypes = {
    isInspectable: PropTypes.bool,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    isInspectable: false,
    onClick: () => {},
  };

  static computeStyle(height = 1) {
    return {
      width: height / 1.4,
      height,
    };
  }

  static computeZoomStyle(isInspecting, height = 1) {
    return {
      zoom: isInspecting ? 3 : height / 140,
    };
  }

  state = {
    isInspecting: false,
    isMouseUp: true,
  };

  onClickStart() {
    this.setState({
      isMouseUp: false,
    });
  }

  onClickEnd(e) {
    if (this.state.isMouseUp) {
      this.setState({
        isMouseUp: false,
      });
    } else if (this.state.isInspecting) {
      this.setState({
        isInspecting: false,
      });
    } else {
      this.props.onClick(e);
    }
  }

  onClickHold() {
    this.setState({
      isInspecting: true,
      isMouseUp: true,
    });
  }

  render() {
    const {
      children,
      isInspectable,
    } = this.props;

    const inspectorClasses = classNames(styles.inspector, {
      [styles.inspecting]: this.state.isInspecting,
    });

    return (
      <ResizeDetector
        handleHeight
        render={({ height }) => (
          <div className={styles.cardContainer} style={CardContainer.computeStyle(height)}>
            <div className={inspectorClasses}>
              <div className={styles.inspectorContent}>
                {isInspectable && (
                  <ClickNHold
                    className={styles.clickable}
                    time={0.25}
                    onStart={this.onClickStart}
                    onEnd={this.onClickEnd}
                    onClickNHold={this.onClickHold}
                  />
                )}
                <div
                  className={styles.cardContainerContent}
                  style={CardContainer.computeZoomStyle(this.state.isInspecting, height)}
                >
                  {children}
                </div>
              </div>
            </div>
          </div>
        )}
      />
    );
  }
}
