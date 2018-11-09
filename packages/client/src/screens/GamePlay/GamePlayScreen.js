import { Component } from 'react';
import { Container } from '@grudge/components';
import PageSuperHeader from 'components/Page/SuperHeader/PageSuperHeader';
import CardInspector from 'components/CardInspector/CardInspector';
import TurnCountdown from 'components/TurnCountdown/TurnCountdown';
import PlayerHUD from 'components/PlayerHUD/PlayerHUD';
import Arena from 'components/Arena/Arena';
import PropTypes from 'prop-types';
import connect from 'utilities/mobx/Connect';
import styles from './GamePlayScreen.scss';

@connect(({ playerStore }) => ({
  playerId: playerStore.currentPlayerId,
}))
export default class GamePlayScreen extends Component {
  static propTypes = {
    playerId: PropTypes.string,
  }

  static defaultProps = {
    playerId: undefined,
  }

  render() {
    const {
      playerId,
    } = this.props;

    return (
      <section className={styles.fullPage}>
        <PageSuperHeader/>
        <CardInspector/>
        <div className={styles.content}>
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
