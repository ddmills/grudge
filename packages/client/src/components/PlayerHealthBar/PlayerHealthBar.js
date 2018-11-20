import { Component } from 'react';
import { PLAYER_MAX_HEALTH } from '@grudge/data';
import connect from 'utilities/mobx/Connect';
import PropTypes from 'prop-types';
import styles from './PlayerHealthBar.scss';

@connect(({ playerStore }, { playerId }) => ({
  health: playerStore.getHealthForPlayer(playerId),
}))
export default class PlayerHealthBar extends Component {
  static propTypes = {
    health: PropTypes.number,
  }

  static defaultProps = {
    health: 0,
  }

  render() {
    const {
      health,
    } = this.props;

    const height = `${(health / PLAYER_MAX_HEALTH) * 100}%`;

    return (
      <div className={styles.healthBarContainer}>
        <div className={styles.healthBar} style={{ height }}/>
      </div>
    );
  }
}
