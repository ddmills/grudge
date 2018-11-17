import { Component } from 'react';
import { Container } from '@grudge/components';
import PageSuperHeader from 'components/Page/SuperHeader/PageSuperHeader';
import CardInspector from 'components/CardInspector/CardInspector';
import TurnCountdown from 'components/TurnCountdown/TurnCountdown';
import PlayerHUD from 'components/PlayerHUD/PlayerHUD';
import PlayerViewer from 'components/PlayerViewer/PlayerViewer';
import Arena from 'components/Arena/Arena';
import PropTypes from 'prop-types';
import connect from 'utilities/mobx/Connect';
import styles from './GamePlayScreen.scss';

@connect(({ playerStore }) => ({
  playerId: playerStore.currentPlayerId,
  selectedPlayerId: playerStore.selectedPlayerId,
}))
export default class GamePlayScreen extends Component {
  static propTypes = {
    playerId: PropTypes.string,
    selectedPlayerId: PropTypes.string,
  }

  static defaultProps = {
    playerId: undefined,
    selectedPlayerId: undefined,
  }

  render() {
    const {
      playerId,
      selectedPlayerId,
    } = this.props;

    return (
      <section className={styles.fullPage}>
        <PageSuperHeader/>
        <CardInspector/>
        <div className={styles.content}>
          <PlayerViewer/>
          <Container className={styles.viewer} isPadded={false}>
            {selectedPlayerId && (
              <Arena playerId={selectedPlayerId} position="bottom"/>
            )}
          </Container>
          <TurnCountdown/>
          <Container className={styles.viewer} isPadded={false}>
            {playerId && (
              <Arena playerId={playerId}/>
            )}
          </Container>
          <PlayerHUD/>
        </div>
      </section>
    );
  }
}
