import { Component } from 'react';
import { Container } from '@grudge/components';
import PropTypes from 'prop-types';
import { Player } from '@grudge/domain';
import Hand from 'components/Hand/Hand';
import connect from 'utilities/mobx/Connect';
import styles from './PlayerHUD.scss';

@connect(({ playerStore }) => ({
  player: playerStore.currentPlayer,
}))
export default class PlayerHUD extends Component {
  static propTypes = {
    player: PropTypes.instanceOf(Player),
  }

  static defaultProps = {
    player: undefined,
  }

  render() {
    const { player } = this.props;

    return (
      <div className={styles.playerHUDBanner}>
        {player && (
          <Container className={styles.playerHUD} isPadded={false}>
            <div className={styles.playerHUDRight}>
              <Hand/>
            </div>
            <div className={styles.playerHUDLeft}>
              <p>
                Money: {player.money}
              </p>
              <p>
                Health: {player.health}
              </p>
            </div>
          </Container>
        )}
      </div>
    );
  }
}
