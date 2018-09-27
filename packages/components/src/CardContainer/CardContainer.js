import { Component } from 'react';
import ResizeDetector from 'react-resize-detector';
import autobind from 'autobind-decorator';
import styles from './CardContainer.scss';

@autobind
export default class CardContainer extends Component {
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
    } = this.props;

    return (
      <ResizeDetector
        handleHeight
        render={({ height }) => (
          <div className={styles.cardContainer} style={CardContainer.computeStyle(height)}>
            <div
              className={styles.cardContainerContent}
              style={CardContainer.computeZoomStyle(height)}
            >
              {children}
            </div>
          </div>
        )}
      />
    );
  }
}
