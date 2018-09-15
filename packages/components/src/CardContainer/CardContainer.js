import { Component } from 'react';
import ResizingText from '../ResizingText/ResizingText';
import styles from './CardContainer.scss';

export default class CardContainer extends Component {
  render() {
    const style = {
      height: '16vh',
    };

    return (
      <div className={styles.cardContainer} style={style}>
        <svg viewBox="0 0 1 1.4"/>
        <div className={styles.cardContainerContent}>
          <ResizingText>
            card container...
          </ResizingText>
        </div>
      </div>
    );
  }
}
