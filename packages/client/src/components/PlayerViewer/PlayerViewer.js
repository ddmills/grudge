import { Component } from 'react';
import { Container, FacedownCard } from '@grudge/components';
import PropTypes from 'prop-types';
import GamePlayerAvatar from 'components/GamePlayerAvatar/GamePlayerAvatar';
import connect from 'utilities/mobx/Connect';
import styles from './PlayerViewer.scss';

@connect(({ playerStore, windowSizeStore }) => ({
  selectedPlayerId: playerStore.selectedPlayerId,
  responsiveCardSize: windowSizeStore.responsiveCardSize,
}))
export default class PlayerViewer extends Component {
  static propTypes = {
    selectedPlayerId: PropTypes.string,
    responsiveCardSize: PropTypes.string,
  }

  static defaultProps = {
    selectedPlayerId: undefined,
    responsiveCardSize: 'sm',
  }

  render() {
    const {
      selectedPlayerId,
      responsiveCardSize,
    } = this.props;

    return (
      <Container className={styles.playerViewer} isPadded={false}>
        <section className={styles.leftSide}>
          <GamePlayerAvatar playerId={selectedPlayerId}/>
        </section>
        <section className={styles.rightSide}>
          <span className={styles.playerHand}>
            <div className={styles.facedownHandCard}>
              <FacedownCard responsiveCardSize={responsiveCardSize}/>
            </div>
            <div className={styles.facedownHandCard}>
              <FacedownCard responsiveCardSize={responsiveCardSize}/>
            </div>
            <div className={styles.facedownHandCard}>
              <FacedownCard responsiveCardSize={responsiveCardSize}/>
            </div>
            <div className={styles.facedownHandCard}>
              <FacedownCard responsiveCardSize={responsiveCardSize}/>
            </div>
            <div className={styles.facedownHandCard}>
              <FacedownCard responsiveCardSize={responsiveCardSize}/>
            </div>
          </span>
        </section>
      </Container>
    );
  }
}
