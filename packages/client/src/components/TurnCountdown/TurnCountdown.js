import { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Button } from '@grudge/components';
import connect from 'utilities/mobx/Connect';
import styles from './TurnCountdown.scss';

@connect(({ turnStore }) => ({
  percentTurnTimeRemaining: turnStore.timer.percentRemaining,
  endTurn: turnStore.endTurn,
}))
export default class TurnCountdown extends Component {
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
      <div className={styles.turnCountdownBanner}>
        <Container className={styles.turnCountdown} isPadded={false}>
          <div className={styles.turnProgress} style={{ width }}/>
          <Button size="sm" color="primary" isDisabled={!endTurn} onClick={endTurn} className={styles.endTurnButton}>
            End turn
          </Button>
        </Container>
      </div>
    );
  }
}
