import { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Button } from '@grudge/components';
import connect from 'utilities/mobx/Connect';
import styles from './LobbyTimeline.scss';

@connect(({ lobbyStore }) => ({
  percentTurnTimeRemaining: lobbyStore.turnTimer.percentRemaining,
  endTurn: lobbyStore.endTurn,
}))
export default class LobbyTimeline extends Component {
  static propTypes = {
    percentTurnTimeRemaining: PropTypes.number,
    endTurn: PropTypes.func,
  };

  static defaultProps = {
    percentTurnTimeRemaining: 100,
    endTurn: undefined,
  };

  render() {
    const {
      endTurn,
      percentTurnTimeRemaining,
    } = this.props;

    const width = `${percentTurnTimeRemaining}%`;

    return (
      <div className={styles.lobbyTimelineBanner}>
        <Container className={styles.lobbyTimeline} isPadded={false}>
          <div className={styles.turnProgress} style={{ width }}/>
          <Button size="sm" color="primary" isDisabled={!endTurn} onClick={endTurn} className={styles.endTurnButton}>
            End turn
          </Button>
        </Container>
      </div>
    );
  }
}
