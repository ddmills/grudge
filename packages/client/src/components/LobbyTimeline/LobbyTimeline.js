import { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from '@grudge/components';
import connect from 'utilities/mobx/Connect';
import styles from './LobbyTimeline.scss';

@connect(({ lobbyStore }) => ({
  percentTurnTimeRemaining: lobbyStore.turnTimer.percentRemaining,
}))
export default class LobbyTimeline extends Component {
  static propTypes = {
    percentTurnTimeRemaining: PropTypes.number,
  };

  static defaultProps = {
    percentTurnTimeRemaining: 100,
  };

  render() {
    const {
      percentTurnTimeRemaining,
    } = this.props;

    const width = `${percentTurnTimeRemaining}%`;

    return (
      <div className={styles.lobbyTimelineBanner}>
        <Container className={styles.lobbyTimeline} isPadded={false}>
          <div className={styles.turnProgress} style={{ width }}/>
        </Container>
      </div>
    );
  }
}
