import { Component } from 'react';
import PropTypes from 'prop-types';
import ResizeDetector from 'react-resize-detector';
import styles from './CardContainer.scss';

export default class CardContainer extends Component {
  static propTypes = {
    height: PropTypes.string,
  };

  static defaultProps = {
    height: '20vh',
  };

  static computeStyle(width = 1) {
    return {
      zoom: width / 100,
    };
  }

  render() {
    const {
      height,
      children,
    } = this.props;

    const style = {
      height,
    };

    return (
      <div className={styles.cardContainer} style={style}>
        <svg viewBox="0 0 1 1.4"/>
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
    );
  }
}
