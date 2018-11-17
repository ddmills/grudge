import { Component } from 'react';
import { Container } from '@grudge/components';
import PropTypes from 'prop-types';
import GamePlayerAvatar from 'components/GamePlayerAvatar/GamePlayerAvatar';
import connect from 'utilities/mobx/Connect';
import styles from './PlayerViewer.scss';

@connect(({ playerStore }) => ({
  selectedPlayerId: playerStore.selectedPlayerId,
  health: playerStore.getHealthForPlayer(playerStore.selectedPlayerId),
  money: playerStore.getMoneyForPlayer(playerStore.selectedPlayerId),
}))
export default class PlayerViewer extends Component {
  static propTypes = {
    selectedPlayerId: PropTypes.string,
    money: PropTypes.number,
    health: PropTypes.number,
  }

  static defaultProps = {
    selectedPlayerId: undefined,
    money: undefined,
    health: undefined,
  }

  render() {
    const {
      selectedPlayerId,
      money,
      health,
    } = this.props;

    return (
      <Container className={styles.playerViewer} isPadded={false}>
        <GamePlayerAvatar playerId={selectedPlayerId}/>
        <span className={styles.playerStats}>
          {Number.isInteger(money) && (
            <p>
              ${money}
            </p>
          )}
          {Number.isInteger(health) && (
            <p>
              {health}hp
            </p>
          )}
        </span>
      </Container>
    );
  }
}
