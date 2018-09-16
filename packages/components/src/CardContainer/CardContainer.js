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
    height: PropTypes.string,
    isInspectable: PropTypes.bool,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    height: '20vh',
    isInspectable: false,
    onClick: () => {},
  };

  static computeStyle(width = 1) {
    return {
      zoom: width / 100,
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
      height,
      children,
      isInspectable,
    } = this.props;

    const style = {
      height,
    };

    const containerClasses = classNames(styles.cardContainer, {
      [styles.inspectable]: isInspectable,
    });

    const inspectorClasses = classNames(styles.inspector, {
      [styles.inspecting]: this.state.isInspecting,
    });

    return (
      <div className={containerClasses} style={style}>
        <svg viewBox="0 0 1 1.4"/>
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
            <ResizeDetector
              handleWidth
              render={({ width }) => (
                <div
                  style={CardContainer.computeStyle(width)}
                  className={styles.cardContainerContent}
                >
                  {children}
                </div>
              )}
            />
          </div>
        </div>
      </div>
    );
  }
}
